// Zenodo deposit builder for the foundational corpus.
//
// For each configured foundational slug, builds a Zenodo deposit payload
// that registers a citable DOI for the piece while declaring the live page
// as the canonical original (related_identifiers → isVariantFormOf). The
// PDF under public/pdfs/{slug}.pdf is the preferred upload; the markdown
// source is the fallback when no PDF exists.
//
// Safety: the live Zenodo API is stubbed behind a ZENODO_TOKEN env check.
//   - No token  → DRY RUN. Prints one payload per slug and the file that
//                 would be uploaded. Touches nothing.
//   - Token set → creates the deposition, uploads the file, attaches the
//                 metadata, publishes, then writes the returned DOI back
//                 into that essay's frontmatter `doi:` field.
//
// Run:
//   node scripts/zenodo-deposit.mjs              # dry run
//   ZENODO_TOKEN=xxxx node scripts/zenodo-deposit.mjs   # live publish
//   ZENODO_BASE=https://sandbox.zenodo.org/api ZENODO_TOKEN=xxxx \
//     node scripts/zenodo-deposit.mjs            # sandbox publish

import { readFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ESSAYS_DIR = join(ROOT, 'src', 'content', 'essays');
const PDF_DIR = join(ROOT, 'public', 'pdfs');

const SITE_URL = 'https://jedanderson.org';
const ZENODO_BASE = process.env.ZENODO_BASE || 'https://zenodo.org/api';
const ZENODO_TOKEN = process.env.ZENODO_TOKEN || '';

// Foundational pieces to deposit. All currently live under essays/.
const FOUNDATIONAL_SLUGS = [
  'bond-bit-ratio',
  'environmental-superintelligence-manifesto',
  'intelligence-leverage-equation',
  'negentropic-imperative',
  'thermodynamic-foundations-of-entropic-shepherding',
  'the-arc',
];

const TYPE_TO_COLLECTION = {
  essay: 'essays',
  post: 'posts',
  book: 'books',
  letter: 'letters',
  speech: 'speeches',
};

function parse(raw) {
  const norm = raw.replace(/\r\n/g, '\n');
  if (!norm.startsWith('---\n')) return null;
  const end = norm.indexOf('\n---', 3);
  if (end === -1) return null;
  const fmText = norm.slice(4, end);
  let data;
  try {
    data = yaml.load(fmText) ?? {};
  } catch {
    return null;
  }
  return { data, fmEnd: end };
}

function canonicalUrl(data, slug) {
  if (data.canonical_url) return data.canonical_url;
  const collection = TYPE_TO_COLLECTION[data.type] ?? 'essays';
  return `${SITE_URL}/${collection}/${slug}`;
}

async function exists(p) {
  try {
    await access(p, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

// Build the Zenodo metadata payload for one essay. canonical_url is wired
// in as related_identifiers → isVariantFormOf so Zenodo records that this
// deposit is a variant format of the canonical web page, not the original.
function buildPayload(data, slug) {
  const url = canonicalUrl(data, slug);
  return {
    metadata: {
      upload_type: 'publication',
      publication_type: 'article',
      title: data.title,
      creators: [{ name: 'Anderson, Jed' }],
      description: data.abstract,
      keywords: Array.isArray(data.tags) ? data.tags : [],
      license: 'cc-by-4.0',
      related_identifiers: [
        {
          identifier: url,
          relation: 'isVariantFormOf',
          scheme: 'url',
        },
      ],
    },
  };
}

// Write the returned DOI back into the essay's frontmatter `doi:` field.
// Replaces an existing `doi:` line if present; otherwise inserts one
// directly after the `status:` line. Only the frontmatter block is touched.
async function writeDoiToFrontmatter(filePath, doi) {
  const raw = await readFile(filePath, 'utf8');
  const norm = raw.replace(/\r\n/g, '\n');
  const end = norm.indexOf('\n---', 3);
  if (end === -1) throw new Error(`No frontmatter block in ${filePath}`);
  let fm = norm.slice(0, end);
  const rest = norm.slice(end);

  if (/^doi:.*$/m.test(fm)) {
    fm = fm.replace(/^doi:.*$/m, `doi: "${doi}"`);
  } else if (/^status:.*$/m.test(fm)) {
    fm = fm.replace(/^(status:.*)$/m, `$1\ndoi: "${doi}"`);
  } else {
    fm = `${fm}\ndoi: "${doi}"`;
  }
  await writeFile(filePath, fm + rest, 'utf8');
}

// ---- Live Zenodo API (only reached when ZENODO_TOKEN is set) ----

async function zfetch(path, opts = {}) {
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${ZENODO_BASE}${path}${sep}access_token=${ZENODO_TOKEN}`, opts);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Zenodo ${opts.method || 'GET'} ${path} → HTTP ${res.status}: ${body}`);
  }
  return res.json();
}

async function publishOne(filePath, data, slug) {
  const payload = buildPayload(data, slug);

  // 1. Create an empty deposition.
  const dep = await zfetch('/deposit/depositions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  // 2. Upload the file (PDF preferred, markdown fallback) to the bucket.
  const pdfPath = join(PDF_DIR, `${slug}.pdf`);
  const uploadPath = (await exists(pdfPath)) ? pdfPath : filePath;
  const fileName = basename(uploadPath);
  const bucketUrl = dep.links.bucket;
  const fileBuf = await readFile(uploadPath);
  const putRes = await fetch(`${bucketUrl}/${fileName}?access_token=${ZENODO_TOKEN}`, {
    method: 'PUT',
    body: fileBuf,
  });
  if (!putRes.ok) {
    throw new Error(`Zenodo file upload failed → HTTP ${putRes.status}: ${await putRes.text()}`);
  }

  // 3. Attach metadata.
  await zfetch(`/deposit/depositions/${dep.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // 4. Publish → mints the DOI.
  const published = await zfetch(`/deposit/depositions/${dep.id}/actions/publish`, {
    method: 'POST',
  });
  const doi = published.doi || published.metadata?.prereserve_doi?.doi;
  if (!doi) throw new Error(`No DOI returned for ${slug}`);

  // 5. Write the DOI back into frontmatter. Triggers nothing else.
  await writeDoiToFrontmatter(filePath, doi);
  return doi;
}

async function main() {
  const dryRun = !ZENODO_TOKEN;
  console.log(dryRun ? '== Zenodo DRY RUN (no ZENODO_TOKEN) ==' : `== Zenodo LIVE publish via ${ZENODO_BASE} ==`);
  console.log('');

  let ok = 0;
  let missing = 0;
  for (const slug of FOUNDATIONAL_SLUGS) {
    const filePath = join(ESSAYS_DIR, `${slug}.md`);
    if (!(await exists(filePath))) {
      console.warn(`! ${slug}: content file not found — skipping.`);
      missing++;
      continue;
    }
    const raw = await readFile(filePath, 'utf8');
    const parsed = parse(raw);
    if (!parsed) {
      console.warn(`! ${slug}: unparseable frontmatter — skipping.`);
      missing++;
      continue;
    }
    const { data } = parsed;
    const payload = buildPayload(data, slug);
    const pdfPath = join(PDF_DIR, `${slug}.pdf`);
    const uploadFile = (await exists(pdfPath))
      ? `public/pdfs/${slug}.pdf`
      : `src/content/essays/${slug}.md`;

    if (dryRun) {
      console.log(`--- ${slug} ---`);
      console.log(`upload file: ${uploadFile}`);
      console.log(JSON.stringify(payload, null, 2));
      console.log('');
      ok++;
    } else {
      try {
        const doi = await publishOne(filePath, data, slug);
        console.log(`✓ ${slug}: published → DOI ${doi} (written to frontmatter)`);
        ok++;
      } catch (err) {
        console.error(`✗ ${slug}: ${err.message}`);
        missing++;
      }
    }
  }

  console.log('');
  console.log(`${dryRun ? 'Dry-run payloads' : 'Published'}: ${ok} | skipped/failed: ${missing}`);
  if (dryRun) {
    console.log('Set ZENODO_TOKEN to publish for real. The script will then write each DOI back into frontmatter.');
  }
}

main().catch((err) => {
  console.error('zenodo-deposit failed:', err);
  process.exit(1);
});
