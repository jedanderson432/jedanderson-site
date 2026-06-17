// Hugging Face dataset export — environmental-superintelligence-corpus.
// =====================================================================
// Builds a machine-readable dataset of every PUBLISHED piece on
// jedanderson.org (essays, posts, books, letters, speeches) and emits:
//
//   hf-dataset/corpus.jsonl    one JSON record per published piece
//   hf-dataset/corpus.parquet  same records, columnar (via pyarrow helper)
//   hf-dataset/schema.json     the record schema + field provenance
//   hf-dataset/README.md       the dataset card
//
// PHASE 1 ONLY: builds + validates artifacts locally. Pushes NOTHING to the
// Hugging Face Hub. HF_TOKEN / HF_USERNAME are read for reporting the planned
// Hub target only; no network calls are made here.
//
//   node scripts/hf-dataset-export.mjs
//
// Each record:
//   { slug, title, type, date, tags, abstract, body_markdown,
//     canonical_url, word_count, license, doi }
//
// - body_markdown is frontmatter-stripped (no leading YAML) — same
//   stripFrontmatter contract as the Zenodo deposit script.
// - license is the per-piece SPDX string from frontmatter (CC-BY-4.0 or
//   CC0-1.0). NOT blanket-labeled.
// - doi is the frontmatter Zenodo concept DOI when present, else null.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const OUT_DIR = join(ROOT, 'hf-dataset');

const SITE_URL = 'https://jedanderson.org';
const GITHUB_REPO = 'https://github.com/jedanderson/jedanderson-site';
const AUTHOR = 'Jed Anderson';
const ORCID = '0009-0003-1807-2459';

// Collection folders == URL path segments (see src/site-config.ts COLLECTIONS
// and src/pages/[type]/[...slug].astro: route is /{collection}/{slug}).
const COLLECTIONS = ['essays', 'posts', 'books', 'letters', 'speeches'];

// Frontmatter `type` is singular; the collection/URL segment is plural.
const COLLECTION_TO_TYPE = {
  essays: 'essay',
  posts: 'post',
  books: 'book',
  letters: 'letter',
  speeches: 'speech',
};

// Licenses we expect to see. Anything else is a hard validation error so a
// new/unknown license can never be silently mislabeled.
const ALLOWED_LICENSES = new Set(['CC-BY-4.0', 'CC0-1.0']);

// The record field set. Every record MUST carry exactly these keys, in this
// order, so the JSONL and Parquet schemas are identical across all rows.
const FIELDS = [
  'slug', 'title', 'type', 'date', 'tags', 'abstract',
  'body_markdown', 'canonical_url', 'word_count', 'license', 'doi',
];

// ---------------------------------------------------------------------
// Frontmatter split + body strip (same contract as zenodo-deposit.mjs)
// ---------------------------------------------------------------------

// Returns { data, body } where body is the prose with the leading YAML
// frontmatter block removed. Returns null if there is no frontmatter.
function parse(raw) {
  const norm = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!norm.startsWith('---\n')) return null;
  const end = norm.indexOf('\n---', 3);
  if (end === -1) return null;
  const fmText = norm.slice(4, end);
  // Body starts after the closing '---' line; drop the trailing newline(s).
  const afterFence = norm.slice(end + 4).replace(/^[ \t]*\n/, '');
  const body = afterFence.replace(/^\n+/, '');
  let data;
  try {
    data = yaml.load(fmText) ?? {};
  } catch {
    return null;
  }
  return { data, body };
}

// Normalize a frontmatter date (Date | string) to ISO YYYY-MM-DD.
function isoDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const m = String(value).match(/^\d{4}-\d{2}-\d{2}/);
  if (m) return m[0];
  const d = new Date(value);
  return Number.isNaN(+d) ? String(value) : d.toISOString().slice(0, 10);
}

// Whitespace-delimited token count of the (frontmatter-stripped) markdown body.
// Deterministic and source-faithful; markdown syntax tokens are included.
function wordCount(body) {
  const t = body.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

// Normalize a frontmatter doi value to a bare DOI ("10.xxxx/..."), or null.
function normalizeDoi(value) {
  if (!value) return null;
  let s = String(value).trim();
  s = s.replace(/^doi:\s*/i, '').replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  return /^10\.\d{4,9}\//.test(s) ? s : null;
}

// ---------------------------------------------------------------------
// .env (HF_USERNAME / HF_TOKEN — reporting only in Phase 1)
// ---------------------------------------------------------------------

async function loadDotEnv() {
  try {
    const raw = await readFile(join(ROOT, '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(m[1] in process.env)) process.env[m[1]] = val;
    }
  } catch { /* no .env — fine for Phase 1 */ }
}

// ---------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------

async function buildRecords() {
  const rows = [];
  const skipped = [];
  for (const collection of COLLECTIONS) {
    const dir = join(CONTENT_DIR, collection);
    let files = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
    } catch {
      continue; // collection dir may not exist
    }
    for (const file of files.sort()) {
      const raw = await readFile(join(dir, file), 'utf8');
      const parsed = parse(raw);
      if (!parsed) { skipped.push(`${collection}/${file}: no frontmatter`); continue; }
      const { data, body } = parsed;
      if (data.status !== 'published') continue; // published only

      const slug = data.slug ? String(data.slug) : basename(file, '.md');
      const type = data.type ? String(data.type) : COLLECTION_TO_TYPE[collection];
      const canonical_url = `${SITE_URL}/${collection}/${slug}`;
      const license = data.license ? String(data.license) : null;

      rows.push({
        slug,
        title: data.title != null ? String(data.title) : '',
        type,
        date: isoDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        abstract: data.abstract != null ? String(data.abstract) : '',
        body_markdown: body,
        canonical_url,
        word_count: wordCount(body),
        license,
        doi: normalizeDoi(data.doi),
        __collection: collection, // internal, stripped before emit
      });
    }
  }

  // Deterministic order: by collection order, then slug.
  const order = Object.fromEntries(COLLECTIONS.map((c, i) => [c, i]));
  rows.sort((a, b) =>
    a.__collection === b.__collection
      ? a.slug.localeCompare(b.slug)
      : order[a.__collection] - order[b.__collection]
  );
  for (const r of rows) delete r.__collection;
  return { rows, skipped };
}

// ---------------------------------------------------------------------
// Validation — schema consistency + no body starts with frontmatter
// ---------------------------------------------------------------------

// True only when the body's first line is a bare YAML/frontmatter fence
// (exactly '---', modulo BOM + trailing whitespace) — the signature of a
// failed strip. Content that opens with dashes-then-text is not a fence.
function startsWithFrontmatterFence(body) {
  const s = body.replace(/^﻿/, '');
  const firstLine = s.split('\n', 1)[0].replace(/[ \t\r]+$/, '');
  return firstLine === '---';
}

function validate(rows) {
  const errors = [];
  const seenSlugs = new Set();
  rows.forEach((r, i) => {
    const keys = Object.keys(r);
    // Exact field set, same order, every row.
    if (keys.length !== FIELDS.length || keys.some((k, j) => k !== FIELDS[j])) {
      errors.push(`row ${i} (${r.slug}): field set/order mismatch → [${keys.join(', ')}]`);
    }
    if (!r.slug) errors.push(`row ${i}: empty slug`);
    if (seenSlugs.has(`${r.type}/${r.slug}`)) errors.push(`duplicate ${r.type}/${r.slug}`);
    seenSlugs.add(`${r.type}/${r.slug}`);
    if (!r.title) errors.push(`row ${i} (${r.slug}): empty title`);
    if (!r.date || !/^\d{4}-\d{2}-\d{2}$/.test(r.date)) errors.push(`row ${i} (${r.slug}): bad date "${r.date}"`);
    if (!Array.isArray(r.tags)) errors.push(`row ${i} (${r.slug}): tags not array`);
    if (typeof r.body_markdown !== 'string' || !r.body_markdown.trim()) errors.push(`row ${i} (${r.slug}): empty body`);
    // The core contract: no record body may still begin with a leftover YAML
    // frontmatter fence — i.e. a first line that is SOLELY '---'. Prose that
    // merely opens with dash characters ('---"a quote"') is genuine content
    // and is NOT flagged.
    if (startsWithFrontmatterFence(r.body_markdown)) {
      errors.push(`row ${i} (${r.slug}): body_markdown still begins with a '---' frontmatter fence`);
    }
    if (!r.canonical_url.startsWith(`${SITE_URL}/`)) errors.push(`row ${i} (${r.slug}): bad canonical_url`);
    if (!Number.isInteger(r.word_count) || r.word_count <= 0) errors.push(`row ${i} (${r.slug}): bad word_count`);
    if (!r.license || !ALLOWED_LICENSES.has(r.license)) errors.push(`row ${i} (${r.slug}): license "${r.license}" not in allow-list`);
    if (r.doi != null && !/^10\.\d{4,9}\//.test(r.doi)) errors.push(`row ${i} (${r.slug}): malformed doi "${r.doi}"`);
  });
  return errors;
}

// ---------------------------------------------------------------------
// Dataset card
// ---------------------------------------------------------------------

function datasetCard(stats) {
  const { total, byType, ccby, cc0, doiRows, hfUser } = stats;
  const target = `${hfUser}/environmental-superintelligence-corpus`;
  const byTypeLines = Object.entries(byType)
    .map(([t, n]) => `| ${t} | ${n} |`)
    .join('\n');
  return `---
license: cc-by-4.0
language:
  - en
pretty_name: "Environmental Superintelligence Corpus — Jed Anderson"
size_categories:
  - n<1K
tags:
  - environmental-superintelligence
  - information-physics
  - bond-bit-asymmetry
  - landauer
  - faith-integrated-reasoning
configs:
  - config_name: default
    data_files:
      - split: train
        path: corpus.parquet
---

# Environmental Superintelligence Corpus

A machine-readable export of the published writing of **${AUTHOR}**
([ORCID ${ORCID}](https://orcid.org/${ORCID})) on environmental
superintelligence, information physics, and faith-integrated first-principles
thinking. The corpus is built around one thesis — **"Bits Protect Its"**:
information accumulates causal sovereignty over matter and energy, so directing
the world by knowledge is, as a matter of physical law, vastly cheaper than
directing it by force. These ${total} records span foundational physics
derivations, long-form essays, and a decade of short-form field notes on
environmental intelligence.

## Contents

${total} published pieces:

| type | count |
|------|-------|
${byTypeLines}

## Schema

Each record carries:

| field | type | description |
|-------|------|-------------|
| \`slug\` | string | URL-stable kebab-case identifier |
| \`title\` | string | Piece title |
| \`type\` | string | One of: essay, post, book, letter, speech |
| \`date\` | string | Publication date, \`YYYY-MM-DD\` |
| \`tags\` | list&lt;string&gt; | Topical tags |
| \`abstract\` | string | Abstract / dek (may be empty) |
| \`body_markdown\` | string | Full prose, frontmatter-stripped (no leading YAML) |
| \`canonical_url\` | string | Authoritative page on jedanderson.org |
| \`word_count\` | int | Whitespace-delimited token count of \`body_markdown\` |
| \`license\` | string | Per-record SPDX license (see Licensing) |
| \`doi\` | string \\| null | Zenodo concept DOI, when one exists |

## Licensing

**This corpus is mixed-license.** The authoritative license for each record is
in that record's \`license\` field:

- Most records are **CC-BY-4.0** (${ccby} records). Reuse is welcome **with
  attribution** to ${AUTHOR} / https://jedanderson.org.
- ${cc0} record is **CC0-1.0** (public domain dedication, no attribution required).

The dataset's top-level \`license\` metadata is set to \`cc-by-4.0\` — the more
restrictive of the two — as a conservative default. **Always defer to the
per-record \`license\` field**, which reflects each piece's actual license.

## Canonical source & provenance

- **Canonical site:** ${SITE_URL} — the live HTML pages are authoritative. Where
  this dataset and the site differ, the site wins. Appending \`.md\` to any
  \`canonical_url\` returns the same frontmatter-stripped body carried here.
- **Source repository:** ${GITHUB_REPO}
- This dataset is generated deterministically from the site source by
  \`scripts/hf-dataset-export.mjs\`.

## Citable records (Zenodo DOIs)

${doiRows} records have a registered Zenodo concept DOI and are independently
citable:

| Essay | Concept DOI |
|-------|-------------|
| The Bond-Bit Ratio | [10.5281/zenodo.20723029](https://doi.org/10.5281/zenodo.20723029) |
| The Intelligence Leverage Equation | [10.5281/zenodo.20724192](https://doi.org/10.5281/zenodo.20724192) |
| The Thermodynamic Foundations of Entropic Shepherding | [10.5281/zenodo.20724194](https://doi.org/10.5281/zenodo.20724194) |
| Bits Protect Its | [10.5281/zenodo.20724187](https://doi.org/10.5281/zenodo.20724187) |
| The First Defender | [10.5281/zenodo.20724227](https://doi.org/10.5281/zenodo.20724227) |

## Citation

> ${AUTHOR}. *Environmental Superintelligence Corpus.* ${SITE_URL}
> (ORCID ${ORCID}). Per-record DOIs above for individually citable pieces.

---

*Planned Hub target: \`${target}\` (public). Generated by Phase 1 build; not yet pushed.*
`;
}

// ---------------------------------------------------------------------
// main
// ---------------------------------------------------------------------

async function main() {
  await loadDotEnv();
  await mkdir(OUT_DIR, { recursive: true });

  const { rows, skipped } = await buildRecords();
  const errors = validate(rows);

  // Stats
  const byType = {};
  for (const r of rows) byType[r.type] = (byType[r.type] ?? 0) + 1;
  const ccby = rows.filter((r) => r.license === 'CC-BY-4.0').length;
  const cc0 = rows.filter((r) => r.license === 'CC0-1.0').length;
  const doiRows = rows.filter((r) => r.doi != null).length;
  const hfUser = process.env.HF_USERNAME || '{HF_USERNAME}';

  // Write JSONL (one record per line).
  const jsonl = rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
  await writeFile(join(OUT_DIR, 'corpus.jsonl'), jsonl, 'utf8');

  // Write schema sidecar.
  const schema = {
    name: 'environmental-superintelligence-corpus',
    record_count: rows.length,
    fields: [
      { name: 'slug', type: 'string', nullable: false, description: 'URL-stable kebab-case identifier' },
      { name: 'title', type: 'string', nullable: false, description: 'Piece title' },
      { name: 'type', type: 'string', nullable: false, description: 'essay | post | book | letter | speech' },
      { name: 'date', type: 'string', nullable: false, description: 'Publication date YYYY-MM-DD' },
      { name: 'tags', type: 'list<string>', nullable: false, description: 'Topical tags' },
      { name: 'abstract', type: 'string', nullable: false, description: 'Abstract / dek (may be empty)' },
      { name: 'body_markdown', type: 'string', nullable: false, description: 'Frontmatter-stripped prose body' },
      { name: 'canonical_url', type: 'string', nullable: false, description: 'Authoritative page on jedanderson.org' },
      { name: 'word_count', type: 'int64', nullable: false, description: 'Whitespace-delimited token count of body_markdown' },
      { name: 'license', type: 'string', nullable: false, description: 'Per-record SPDX license: CC-BY-4.0 or CC0-1.0' },
      { name: 'doi', type: 'string', nullable: true, description: 'Zenodo concept DOI when present, else null' },
    ],
  };
  await writeFile(join(OUT_DIR, 'schema.json'), JSON.stringify(schema, null, 2) + '\n', 'utf8');

  // Write dataset card.
  await writeFile(
    join(OUT_DIR, 'README.md'),
    datasetCard({ total: rows.length, byType, ccby, cc0, doiRows, hfUser }),
    'utf8'
  );

  // Convert JSONL -> Parquet via the pyarrow helper (explicit, stable schema).
  const py = spawnSync('python', [join(__dirname, 'hf_jsonl_to_parquet.py'),
    join(OUT_DIR, 'corpus.jsonl'), join(OUT_DIR, 'corpus.parquet')],
    { encoding: 'utf8' });
  const parquetOk = py.status === 0;

  // Report
  console.log('== HF dataset export (Phase 1 — local only) ==');
  console.log(`published records: ${rows.length}`);
  console.log('by type:', JSON.stringify(byType));
  console.log(`license: CC-BY-4.0=${ccby}  CC0-1.0=${cc0}`);
  console.log(`Zenodo DOIs: ${doiRows}`);
  if (skipped.length) console.log(`skipped (no frontmatter): ${skipped.length}\n  ${skipped.join('\n  ')}`);
  console.log('\nartifacts:');
  console.log(`  hf-dataset/corpus.jsonl    (${rows.length} rows)`);
  console.log(`  hf-dataset/corpus.parquet  ${parquetOk ? '(written)' : 'FAILED'}`);
  console.log('  hf-dataset/schema.json');
  console.log('  hf-dataset/README.md');
  if (!parquetOk) {
    console.error('\nParquet step output:\n' + (py.stderr || py.stdout || '(no output)'));
  } else if (py.stdout) {
    console.log('\nparquet:', py.stdout.trim());
  }
  console.log(`\nplanned Hub target: ${hfUser}/environmental-superintelligence-corpus (PUBLIC) — NOT pushed`);

  if (errors.length) {
    console.error(`\nVALIDATION FAILED — ${errors.length} error(s):`);
    for (const e of errors.slice(0, 50)) console.error('  ✗ ' + e);
    process.exit(1);
  }
  if (!parquetOk) process.exit(1);
  console.log('\nVALIDATION PASSED — schema consistent, no body begins with frontmatter.');
}

main().catch((err) => {
  console.error('hf-dataset-export failed:', err);
  process.exit(1);
});
