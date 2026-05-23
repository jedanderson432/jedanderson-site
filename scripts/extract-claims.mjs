// Deterministic, build-time extractor for numerical claims in the
// published essay corpus. No LLM calls. No network. Same inputs ->
// identical output on every build.
//
// Pipeline:
//   1. Walk src/content/essays/*.md
//   2. Skip drafts (status != 'published')
//   3. Strip frontmatter, code blocks, inline code, link URLs, citations,
//      heading lines — anything that would generate noise.
//   4. Run a battery of regex matchers (scientific notation, ratios,
//      percentages, SI values, durations, counts).
//   5. De-duplicate overlapping matches greedily, keeping the longest.
//   6. For each kept match: compute stable id (sha256 of slug + value +
//      unit + normalized containing sentence), pull sentence + ±200char
//      context, default epistemic_status='needs_review', uncertainty='',
//      last_verified=publication date.
//   7. Load data/manual-claims-extras.json (strip // comment lines first),
//      then merge: manual rows with matching ids OVERRIDE auto rows; new
//      manual rows are appended.
//   8. Write public/data/canonical-claims.json (pretty-printed, stable
//      sort order: by essay_slug then by line number).
//   9. Validate the JSON output is well-formed before exiting; non-zero
//      exit fails the build.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ESSAYS_DIR = join(ROOT, 'src', 'content', 'essays');
const OUT_FILE = join(ROOT, 'public', 'data', 'canonical-claims.json');
const MANUAL_FILE = join(ROOT, 'data', 'manual-claims-extras.json');

// Unit allow-list. Order matters: composite/longer units come first so
// the regex doesn't match a prefix (e.g., 'kJ/mol' must beat 'J').
const UNIT_LIST = [
  // Composite (energy per quantity)
  'kJ/mol', 'J/mol', 'J/bit', 'J/bond', 'J/cycle', 'J/g', 'kWh/m³', 'kWh/m3',
  // Information / rate
  'bits/sec', 'bits/s', 'bps',
  // Concentration / mass per volume
  'µg/m³', 'µg/m3', 'ug/m3', 'µg/L', 'ug/L', 'mg/L', 'g/L', 'mg/kg', 'g/kg', 'g/cm³', 'g/cm3',
  // Emissions
  'GtCO₂', 'GtCO2', 'MtCO₂', 'MtCO2', 'tCO₂', 'tCO2', 'GtC', 'MtC',
  // Energy multiples
  'kWh', 'MWh', 'GWh', 'TWh',
  'kJ', 'MJ', 'GJ',
  // Energy (eV family)
  'GeV', 'MeV', 'keV', 'eV',
  // Length
  'km', 'cm', 'mm', 'µm', 'um', 'nm', 'pm',
  // Time (sub-second)
  'ms', 'µs', 'us', 'ns', 'ps', 'fs',
  // Frequency
  'THz', 'GHz', 'MHz', 'kHz', 'PHz',
  // Power
  'TW', 'GW', 'MW', 'kW', 'PW',
  // Pressure
  'GPa', 'MPa', 'kPa', 'hPa',
  // Mass multiples
  'Pt', 'Gt', 'Mt',
  // Astro
  'ly', 'AU', 'pc',
  // Base SI / common
  'Hz', 'Pa', 'kg', 'mol', 'ppm', 'ppb', 'ppt',
  'J', 'K', 'V', 'A', 'W', 'C', 'm', 's', 'g',
  // Information
  'bit', 'bits', 'byte', 'bytes',
  // Temperature
  '°C', '°F',
];

// Narrow allow-list for "<number> <noun>" count claims. Keep tight to
// avoid noise (every '3 reasons' or '4 steps' would otherwise match).
const COUNT_NOUNS = [
  'species', 'essays', 'papers', 'tokens', 'cells', 'molecules', 'bonds',
  'genomes', 'satellites', 'sensors', 'forecasters', 'co-authors',
  'orders of magnitude', 'doublings', 'tipping elements', 'datasets',
  'planetary boundaries', 'grid cells', 'verification targets', 'countries',
  'authors', 'mass extinctions',
];

const DURATION_NOUNS = [
  'years', 'year', 'months', 'month', 'decades', 'decade',
  'centuries', 'century', 'millennia', 'millennium',
  'days', 'day', 'hours', 'hour', 'minutes', 'minute', 'seconds', 'second',
];

// Unicode super/sub script translation tables.
const SUPER_MAP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁻': '-', '⁺': '+',
};
function unsuper(s) {
  return s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, c => SUPER_MAP[c] ?? c);
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const UNIT_ALT = UNIT_LIST.map(escapeRegex).join('|');
const COUNT_ALT = COUNT_NOUNS.map(escapeRegex).join('|');
const DURATION_ALT = DURATION_NOUNS.map(escapeRegex).join('|');

// Build pattern set. Each entry: { name, regex (global), capture(m) -> {value, unit, type} | null }.
// A null return drops the candidate.
const PATTERNS = [
  // 1. Scientific notation + unit
  //    "2.87 × 10⁻²¹ J/bit", "6.86 x 10^-19 J/bond"
  {
    name: 'scinote-unit',
    regex: new RegExp(
      `(\\d+(?:\\.\\d+)?)\\s*[×x]\\s*10\\s*\\^?([⁻⁺\\-+]?[⁰¹²³⁴⁵⁶⁷⁸⁹\\d]+)\\s*(${UNIT_ALT})\\b`,
      'g',
    ),
    capture: (m) => ({
      value: `${m[1]}×10^${unsuper(m[2])}`,
      unit: m[3],
      type: 'scientific',
    }),
  },
  // 2. Bare power of 10 (no unit) — only when the exponent is at least
  //    2 digits OR is signed (negative/positive), to avoid matching '10 of'.
  //    The leading \b on '10' is critical so we don't match '10' inside
  //    e.g. arXiv:gr-qc/9310026.
  {
    name: 'scinote-bare',
    regex: /(?:\b(\d+(?:\.\d+)?)\s*[×x]\s*)?\b10\s*\^?([⁻⁺\-+][⁰¹²³⁴⁵⁶⁷⁸⁹\d]+|[⁰¹²³⁴⁵⁶⁷⁸⁹\d]{2,})\b/g,
    capture: (m) => {
      const mantissa = m[1] || '1';
      const exp = unsuper(m[2]);
      const n = parseInt(exp, 10);
      if (Number.isNaN(n) || Math.abs(n) < 2) return null;
      return { value: `${mantissa}×10^${exp}`, unit: '(dimensionless)', type: 'scientific-bare' };
    },
  },
  // 3. Multiplier ratio with literal '×'
  //    "240×", "4,500×", "10²⁰×"
  {
    name: 'multiplier',
    regex: /\b(\d+(?:,\d{3})*(?:\.\d+)?|10\s*\^?[⁻⁺\-+]?[⁰¹²³⁴⁵⁶⁷⁸⁹\d]+)×/g,
    capture: (m) => ({
      value: m[1].replace(/,/g, '').replace(/\s+/g, '') + '×',
      unit: 'ratio',
      type: 'multiplier',
    }),
  },
  // 4. Percentages
  {
    name: 'percent',
    regex: /\b(\d+(?:\.\d+)?)\s*%/g,
    capture: (m) => ({ value: m[1], unit: '%', type: 'percent' }),
  },
  // 5. SI value with unit, comma-grouped allowed. Requires horizontal
  //    whitespace (space/tab) — not newline — so footnote markers like
  //    "...sentence.1\n\nA new sentence" do not match as "1 A".
  //    The (?<![\d.]) lookbehind also excludes "...sentence.1 A new"
  //    same-line footnote markers.
  //    "413 kJ/mol", "1,200 GW"
  {
    name: 'si-unit',
    regex: new RegExp(`(?<![\\d.])\\b(\\d+(?:,\\d{3})*(?:\\.\\d+)?)[ \\t]+(${UNIT_ALT})\\b`, 'g'),
    capture: (m) => ({
      value: m[1].replace(/,/g, ''),
      unit: m[2],
      type: 'si',
    }),
  },
  // 6. Durations
  {
    name: 'duration',
    regex: new RegExp(`(?<![\\d.])\\b(\\d+(?:,\\d{3})*(?:\\.\\d+)?)[-\\s]+(${DURATION_ALT})\\b`, 'g'),
    capture: (m) => ({
      value: m[1].replace(/,/g, ''),
      unit: m[2],
      type: 'duration',
    }),
  },
  // 7. Counts (narrow allow-list)
  {
    name: 'count',
    regex: new RegExp(`(?<![\\d.])\\b(\\d+(?:,\\d{3})*(?:\\.\\d+)?)[ \\t]+(${COUNT_ALT})\\b`, 'g'),
    capture: (m) => ({
      value: m[1].replace(/,/g, ''),
      unit: m[2],
      type: 'count',
    }),
  },
];

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { __body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { __body: raw };
  const fmText = raw.slice(3, end);
  const body = raw.slice(end + 4);
  const out = { __body: body };
  for (const line of fmText.split('\n')) {
    const m = line.match(/^([a-zA-Z_][\w]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

// Strip content the matcher should not see. Replaces stripped regions
// with newlines/spaces of equal length so subsequent character offsets
// still map back to the original body.
function stripForScan(body) {
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  let out = body;
  // Fenced code blocks
  out = out.replace(/```[\s\S]*?```/g, blank);
  // Inline code
  out = out.replace(/`[^`\n]+`/g, blank);
  // Markdown link URLs: keep [text], blank the (url) part
  out = out.replace(/\]\(([^)\n]+)\)/g, (m) => ']' + ' '.repeat(m.length - 1));
  // Bare URLs — http(s)://...
  out = out.replace(/https?:\/\/\S+/g, blank);
  // Bare DOIs, arXiv IDs, and similar bibliographic noise that the
  // reference matchers would otherwise pull spurious '10^xx' values from.
  out = out.replace(/\barXiv:\S+/gi, blank);
  out = out.replace(/\b(?:gr-qc|hep-th|hep-ph|cond-mat|math-ph|math\.[A-Z]+|cs\.[A-Z]+|stat\.[A-Z]+|quant-ph|astro-ph)\/\S+/g, blank);
  out = out.replace(/\bdoi:\S+/gi, blank);
  out = out.replace(/\b10\.\d{4,9}\/\S+/g, blank); // DOI pattern
  // Reference-style citations [1], [3, 4]
  out = out.replace(/\[\d+(?:[,\s\d]*)\]/g, blank);
  // HTML tags (loose)
  out = out.replace(/<[^>\n]+>/g, blank);
  // Heading lines — blank entirely
  out = out.split('\n').map((line) =>
    /^#{1,6}\s/.test(line) ? ' '.repeat(line.length) : line,
  ).join('\n');
  return out;
}

function sentenceAround(text, offset) {
  let start = 0;
  for (let i = offset - 1; i > 0; i--) {
    if (text[i] === '\n' && text[i - 1] === '\n') { start = i + 1; break; }
    if ((text[i] === '.' || text[i] === '!' || text[i] === '?') && (text[i + 1] === ' ' || text[i + 1] === '\n')) {
      start = i + 1; break;
    }
  }
  let end = text.length;
  for (let i = offset; i < text.length; i++) {
    if (text[i] === '\n' && text[i + 1] === '\n') { end = i; break; }
    if ((text[i] === '.' || text[i] === '!' || text[i] === '?') &&
        (i + 1 >= text.length || text[i + 1] === ' ' || text[i + 1] === '\n')) {
      end = i + 1; break;
    }
  }
  return text.slice(start, end).trim().replace(/\s+/g, ' ');
}

function normalizeForHash(s) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function makeId(slug, value, unit, sentence) {
  const h = createHash('sha256');
  h.update(`${slug}|${value}|${unit}|${normalizeForHash(sentence)}`);
  return 'auto-' + h.digest('hex').slice(0, 12);
}

function extractFromEssay(slug, body, date) {
  const cleaned = stripForScan(body);
  const candidates = [];

  for (const pat of PATTERNS) {
    pat.regex.lastIndex = 0;
    let m;
    while ((m = pat.regex.exec(cleaned)) !== null) {
      const cap = pat.capture(m);
      if (!cap) continue;
      candidates.push({
        start: m.index,
        end: m.index + m[0].length,
        match: m[0],
        pattern: pat.name,
        ...cap,
      });
    }
  }

  // Greedy de-overlap: longest match wins, then earliest position.
  candidates.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start);
  const kept = [];
  const occupied = [];
  for (const c of candidates) {
    if (occupied.some(([s, e]) => c.start < e && c.end > s)) continue;
    kept.push(c);
    occupied.push([c.start, c.end]);
  }
  kept.sort((a, b) => a.start - b.start);

  // Line numbering — using the *original* body, not the stripped one,
  // because offsets line up.
  const lineStarts = [0];
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '\n') lineStarts.push(i + 1);
  }
  function lineOf(o) {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= o) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  }

  return kept.map((c) => {
    const sentence = sentenceAround(cleaned, c.start);
    const ctxStart = Math.max(0, c.start - 200);
    const ctxEnd = Math.min(cleaned.length, c.end + 200);
    const context = cleaned.slice(ctxStart, ctxEnd).replace(/\s+/g, ' ').trim();
    return {
      id: makeId(slug, c.value, c.unit, sentence),
      essay_slug: slug,
      value: c.value,
      unit: c.unit,
      type: c.type,
      pattern: c.pattern,
      match: c.match,
      claim: sentence,
      context,
      line: lineOf(c.start),
      epistemic_status: 'needs_review',
      uncertainty: '',
      last_verified: date,
    };
  });
}

async function readManualOverrides() {
  let text;
  try {
    text = await readFile(MANUAL_FILE, 'utf-8');
  } catch {
    return [];
  }
  // Strip // line comments so a JSON-with-comments file parses.
  const stripped = text.split('\n')
    .map((line) => {
      // Naive but adequate: drop everything from the first '//' that's
      // not preceded by a colon (avoid stripping URLs like https://).
      const idx = line.indexOf('//');
      if (idx === -1) return line;
      // Allow '://' (URLs) and '/*' to pass through.
      if (idx > 0 && line[idx - 1] === ':') return line;
      return line.slice(0, idx);
    })
    .join('\n');
  try {
    const parsed = JSON.parse(stripped);
    if (!Array.isArray(parsed)) {
      throw new Error('data/manual-claims-extras.json must be a JSON array');
    }
    for (const row of parsed) {
      if (!row.id || typeof row.id !== 'string') {
        throw new Error(`manual row missing string 'id' field: ${JSON.stringify(row).slice(0, 200)}`);
      }
      if (!row.id.startsWith('manual-') && !row.id.startsWith('auto-')) {
        throw new Error(`manual row id must start with 'manual-' (new) or 'auto-' (override): ${row.id}`);
      }
    }
    return parsed;
  } catch (e) {
    throw new Error(`failed to parse ${MANUAL_FILE}: ${e.message}`);
  }
}

async function main() {
  const files = (await readdir(ESSAYS_DIR))
    .filter((f) => f.endsWith('.md'))
    .sort(); // deterministic input order

  const auto = [];
  let essayCount = 0;
  for (const f of files) {
    let raw = await readFile(join(ESSAYS_DIR, f), 'utf-8');
    // Normalize line endings so frontmatter parsing and offset math are
    // identical on Windows and POSIX checkouts.
    raw = raw.replace(/\r\n?/g, '\n');
    const fm = parseFrontmatter(raw);
    if (fm.status !== 'published') continue;
    essayCount += 1;
    const slug = fm.slug || basename(f, '.md');
    const date = fm.date || '';
    const body = fm.__body || '';
    auto.push(...extractFromEssay(slug, body, date));
  }

  // Stable sort of auto rows.
  auto.sort((a, b) => a.essay_slug.localeCompare(b.essay_slug) || a.line - b.line || a.id.localeCompare(b.id));

  const manual = await readManualOverrides();

  // Build final dataset: start from auto, then apply manual rows.
  const byId = new Map(auto.map((r) => [r.id, r]));
  let overrideCount = 0;
  let newManualCount = 0;
  for (const row of manual) {
    if (byId.has(row.id)) {
      byId.set(row.id, { ...byId.get(row.id), ...row });
      overrideCount += 1;
    } else {
      byId.set(row.id, row);
      newManualCount += 1;
    }
  }

  const final = [...byId.values()];
  final.sort((a, b) =>
    (a.essay_slug || '').localeCompare(b.essay_slug || '') ||
    (a.line ?? 0) - (b.line ?? 0) ||
    a.id.localeCompare(b.id),
  );

  // Epistemic-status breakdown.
  const statusCounts = {};
  for (const r of final) {
    const s = r.epistemic_status || 'unspecified';
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  }

  const out = {
    schema_version: '1',
    generated: 'deterministic build-time extraction from src/content/essays + data/manual-claims-extras.json',
    license: 'CC-BY-4.0',
    counts: {
      total: final.length,
      auto_extracted: auto.length,
      manual_entries: manual.length,
      manual_overrides: overrideCount,
      manual_new: newManualCount,
      essays_scanned: essayCount,
      by_status: statusCounts,
    },
    schema: {
      id: 'Stable identifier. auto-<hash> for extractor output, manual-<slug> for hand-curated rows.',
      essay_slug: 'Slug of the source essay; resolves to /essays/{slug}.',
      value: 'Normalized numerical value (e.g., "2.87×10^-21", "240×", "90").',
      unit: 'Unit string from the project allow-list, or "ratio" / "%" / a count noun / "(dimensionless)".',
      type: 'Pattern family: scientific | scientific-bare | multiplier | percent | si | duration | count | manual',
      pattern: 'Name of the matcher that produced the row (auto only).',
      match: 'Verbatim text from the essay that the matcher captured (auto only).',
      claim: 'Sentence containing the value, normalized whitespace.',
      context: 'Surrounding text (±200 chars) for disambiguation.',
      line: '1-based line number of the match in the essay markdown.',
      epistemic_status: 'One of: established | framework-dependent | estimated | bet | needs_review.',
      uncertainty: 'Free-text uncertainty note; default empty.',
      last_verified: 'Date the claim was last manually verified, ISO yyyy-mm-dd.',
    },
    claims: final,
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  const jsonText = JSON.stringify(out, null, 2) + '\n';

  // Self-validate: round-trip the JSON we just produced.
  try {
    JSON.parse(jsonText);
  } catch (e) {
    throw new Error(`extract-claims produced invalid JSON: ${e.message}`);
  }

  await writeFile(OUT_FILE, jsonText, 'utf-8');

  console.log(
    `[extract-claims] Extracted ${auto.length} claims from ${essayCount} essays; ` +
    `merged ${manual.length} manual entries (${overrideCount} overrides, ${newManualCount} new); ` +
    `final dataset has ${final.length} rows.`,
  );
}

// Re-validate the on-disk JSON output. Used by the Astro integration
// so a corrupted public/data/canonical-claims.json (hand-edited, or
// the prebuild was skipped) still fails the build.
export async function validateClaimsJson() {
  let raw;
  try {
    raw = await readFile(OUT_FILE, 'utf-8');
  } catch (e) {
    throw new Error(
      `public/data/canonical-claims.json missing — run \`npm run extract-claims\` ` +
      `or rerun \`npm run build\`. (${e.message})`,
    );
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`public/data/canonical-claims.json is malformed JSON: ${e.message}`);
  }
  if (parsed.schema_version !== '1') {
    throw new Error(
      `canonical-claims.json schema_version mismatch: expected "1", got ${JSON.stringify(parsed.schema_version)}`,
    );
  }
  if (!Array.isArray(parsed.claims)) {
    throw new Error('canonical-claims.json must have a "claims" array');
  }
  for (const row of parsed.claims) {
    if (!row.id || typeof row.id !== 'string') {
      throw new Error(`claim row missing string "id": ${JSON.stringify(row).slice(0, 200)}`);
    }
  }
}

// Only run as a script when invoked directly, not when imported.
const invokedDirectly = process.argv[1] && process.argv[1].endsWith('extract-claims.mjs');
if (invokedDirectly) {
  main().catch((e) => {
    console.error('[extract-claims] FAILED:', e.message);
    process.exit(1);
  });
}
