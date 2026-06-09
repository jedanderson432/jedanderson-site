// Hugging Face dataset export.
//
// Reads every published markdown file under src/content/**, and emits a
// flat JSONL corpus suitable for upload as a Hugging Face dataset. Also
// copies the canonical-claims dataset alongside it and writes a dataset
// README declaring CC-BY-4.0 and the canonical source.
//
// This pass produces artifacts only — it does NOT push to the Hugging
// Face Hub (no token in this pass). Run:
//
//   node scripts/export-hf-dataset.mjs
//
// Output:
//   dataset/corpus.jsonl            one JSON object per published piece
//   dataset/canonical-claims.json   copy of the claims dataset
//   dataset/README.md               dataset card (CC-BY-4.0, provenance)
//
// Each corpus.jsonl row:
//   { title, slug, type, date, tags, abstract, body_markdown,
//     canonical_url, license }

import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const CLAIMS_SRC = join(ROOT, 'public', 'data', 'canonical-claims.json');
const OUT_DIR = join(ROOT, 'dataset');

const SITE_URL = 'https://jedanderson.org';

// Frontmatter `type` is singular; URLs/collections are plural.
const TYPE_TO_COLLECTION = {
  essay: 'essays',
  post: 'posts',
  book: 'books',
  letter: 'letters',
  speech: 'speeches',
};

const COLLECTIONS = ['essays', 'posts', 'books', 'letters', 'speeches'];

// Split a markdown file into { data, body } using the YAML frontmatter
// block. Returns null if there's no frontmatter.
function parse(raw) {
  const norm = raw.replace(/\r\n/g, '\n');
  if (!norm.startsWith('---\n')) return null;
  const end = norm.indexOf('\n---', 3);
  if (end === -1) return null;
  const fmText = norm.slice(4, end);
  const body = norm.slice(end + 4).replace(/^\n+/, '');
  let data;
  try {
    data = yaml.load(fmText) ?? {};
  } catch {
    return null;
  }
  return { data, body };
}

// Canonical URL: honor explicit frontmatter, else derive from type+slug.
function canonicalUrl(data, slug) {
  if (data.canonical_url) return data.canonical_url;
  const collection = TYPE_TO_COLLECTION[data.type] ?? 'essays';
  return `${SITE_URL}/${collection}/${slug}`;
}

// Normalize a frontmatter date (Date | string) to an ISO date (YYYY-MM-DD).
function isoDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const d = new Date(value);
  return Number.isNaN(+d) ? String(value) : d.toISOString().slice(0, 10);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const rows = [];
  for (const collection of COLLECTIONS) {
    const dir = join(CONTENT_DIR, collection);
    let files = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
    } catch {
      continue; // collection dir may not exist
    }
    for (const file of files) {
      const raw = await readFile(join(dir, file), 'utf8');
      const parsed = parse(raw);
      if (!parsed) continue;
      const { data, body } = parsed;
      if (data.status !== 'published') continue; // published only

      // Slug: explicit frontmatter slug wins, else filename stem.
      const slug = data.slug ? String(data.slug) : basename(file, '.md');

      rows.push({
        title: data.title ?? '',
        slug,
        type: data.type ?? COLLECTIONS_SINGULAR(collection),
        date: isoDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        abstract: data.abstract ?? '',
        body_markdown: body,
        canonical_url: canonicalUrl(data, slug),
        license: data.license ?? 'CC-BY-4.0',
      });
    }
  }

  // Stable order: by type, then slug. Deterministic output across runs.
  rows.sort((a, b) =>
    a.type === b.type ? a.slug.localeCompare(b.slug) : a.type.localeCompare(b.type)
  );

  const jsonl = rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
  await writeFile(join(OUT_DIR, 'corpus.jsonl'), jsonl, 'utf8');

  // Second file: the canonical-claims dataset, copied verbatim.
  let claimsCopied = false;
  try {
    await copyFile(CLAIMS_SRC, join(OUT_DIR, 'canonical-claims.json'));
    claimsCopied = true;
  } catch {
    console.warn('WARN: canonical-claims.json not found — run the build first to generate it.');
  }

  await writeFile(join(OUT_DIR, 'README.md'), readmeMarkdown(rows.length), 'utf8');

  const byType = rows.reduce((acc, r) => ((acc[r.type] = (acc[r.type] ?? 0) + 1), acc), {});
  console.log('HF dataset export complete.');
  console.log(`  dataset/corpus.jsonl       ${rows.length} published piece(s)`);
  console.log(`  by type: ${JSON.stringify(byType)}`);
  console.log(`  dataset/canonical-claims.json  ${claimsCopied ? 'copied' : 'MISSING'}`);
  console.log(`  dataset/README.md          written`);
}

function COLLECTIONS_SINGULAR(collection) {
  const m = { essays: 'essay', posts: 'post', books: 'book', letters: 'letter', speeches: 'speech' };
  return m[collection] ?? collection;
}

function readmeMarkdown(count) {
  return `---
license: cc-by-4.0
language:
  - en
pretty_name: "Jed Anderson — Corpus"
tags:
  - environmental-superintelligence
  - information-physics
  - essays
---

# Jed Anderson — Corpus

A machine-readable export of the published writing of Jed Anderson on
environmental superintelligence, information physics, and faith-integrated
first-principles thinking. Central thesis: **Bits Protect Its**—information
accumulates causal sovereignty over matter and energy.

## Canonical source

The canonical source of this corpus is **https://jedanderson.org**. This
dataset is a variant format of that site, provided for convenient bulk
ingestion. Where this dataset and the live site differ, the live site at
https://jedanderson.org is authoritative.

## Files

- \`corpus.jsonl\` — one JSON object per published piece (${count} rows). Fields:
  \`title\`, \`slug\`, \`type\`, \`date\`, \`tags\`, \`abstract\`, \`body_markdown\`,
  \`canonical_url\`, \`license\`.
- \`canonical-claims.json\` — build-time deterministic extraction of every
  numerical claim in the published essay corpus, each with a stable
  identifier, source-essay slug, and sentence-level context.

## License

All content is licensed **CC-BY-4.0** (some individual pieces are CC0—see
each piece's \`license\` field). Attribution: Jed Anderson, https://jedanderson.org.

## Provenance

Generated deterministically from the site source by
\`scripts/export-hf-dataset.mjs\`. Each row's \`canonical_url\` links back to
the authoritative HTML page; appending \`.md\` to that URL returns the same
markdown body carried in \`body_markdown\`.
`;
}

main().catch((err) => {
  console.error('HF dataset export failed:', err);
  process.exit(1);
});
