// Build-time gate: every local asset a piece points at must actually exist
// under public/. Throws on any violation — build/dev/sync all fail. Wired
// into astro.config.mjs alongside the slug and revision-history validators.
//
// Checked references:
//   - markdown images            ![alt](/images/foo.png)
//   - raw <img src="...">        (bodies may carry HTML for figure blocks)
//   - frontmatter hero_image
//   - frontmatter pdf (and pdf_pages, which must match its real page count)
//   - frontmatter supporting_files[].file
//   - frontmatter interactive_url  (a directory, must contain index.html)
//   - the essays-index card fallback
//
// That last one is not a reference the content file makes, which is exactly
// why it needs checking here. src/pages/essays/index.astro falls back to
// /images/{slug}-thumb.jpg when a published essay has no hero_image, and
// those thumbs come from scripts/generate-thumbnails.py, which is NOT part of
// `npm run build`. So publishing an essay without a hero silently ships a
// broken image on the archive listing while the essay page itself is fine —
// invisible to any check that only looks at the piece's own page.
//
// External http(s) URLs are out of scope: this gate is about files the repo
// is responsible for shipping.

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';
import { glob } from 'tinyglobby';
import yaml from 'js-yaml';
import { pdfPageCount } from './pdf-page-count.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const COLLECTIONS = [
  'essays', 'papers', 'posts', 'notes', 'letters', 'speeches', 'books',
];

const isExternal = (u) => /^(https?:)?\/\//i.test(u) || u.startsWith('data:') || u.startsWith('mailto:');

// Resolve a site-root-absolute reference to a path under public/.
// Anything not starting with "/" is a relative reference, which cannot
// resolve against a built page URL and is reported as such.
function publicPathFor(ref) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  return join(PUBLIC, decodeURIComponent(clean));
}

function splitFrontmatter(raw) {
  if (!raw.startsWith('---')) return { fm: null, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { fm: null, body: raw };
  let parsed = null;
  try { parsed = yaml.load(raw.slice(3, end)); } catch { parsed = null; }
  return { fm: parsed, body: raw.slice(end + 4) };
}

function collectBodyRefs(body) {
  const refs = [];
  // Markdown images. Tolerates a title after the URL: ![alt](/x.png "t")
  for (const m of body.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g)) {
    refs.push({ kind: 'markdown image', value: m[1] });
  }
  // Raw <img src="...">
  for (const m of body.matchAll(/<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi)) {
    refs.push({ kind: 'img src', value: m[1] });
  }
  return refs;
}

export async function validateAssets() {
  const patterns = COLLECTIONS.map((c) => `src/content/${c}/**/*.{md,mdx}`);
  const files = await glob(patterns, { cwd: ROOT, absolute: true });

  const errors = [];
  let checked = 0;

  for (const file of files) {
    const raw = await readFile(file, 'utf-8');
    const { fm, body } = splitFrontmatter(raw);
    const rel = relative(ROOT, file);
    const slug = (fm && fm.slug) || file.split(/[\/]/).pop().replace(/\.mdx?$/, '');

    const refs = collectBodyRefs(body);
    if (fm) {
      if (fm.hero_image) refs.push({ kind: 'hero_image', value: String(fm.hero_image) });
      if (fm.pdf) refs.push({ kind: 'pdf', value: String(fm.pdf) });
      if (Array.isArray(fm.supporting_files)) {
        for (const sf of fm.supporting_files) {
          if (sf && sf.file) refs.push({ kind: 'supporting_files.file', value: String(sf.file) });
        }
      }
      if (fm.interactive_url) {
        refs.push({
          kind: 'interactive_url',
          value: String(fm.interactive_url).replace(/\/*$/, '/') + 'index.html',
        });
      }
      // Archive-listing card fallback for published essays without a hero.
      const isEssay = rel.split(sep).join('/').includes('/content/essays/');
      if (isEssay && fm.status === 'published' && !fm.hero_image) {
        refs.push({ kind: 'essays-index thumb fallback', value: `/images/${slug}-thumb.jpg` });
      }
    }

    // pdf_pages is a claim about a file, not a reference to one: the page
    // renders it as "Download PDF · N pages" and the PDF gets re-rendered
    // whenever the prose changes, so a stale N is silent and permanent.
    if (fm && fm.pdf && fm.pdf_pages != null && !isExternal(String(fm.pdf))) {
      const pdfPath = publicPathFor(String(fm.pdf));
      if (pdfPath && existsSync(pdfPath)) {
        const actual = pdfPageCount(pdfPath);
        const declared = Number(fm.pdf_pages);
        if (actual === null) {
          errors.push(`${rel}
      pdf_pages: ${declared}
      -> could not read page count from public${String(fm.pdf)}`);
        } else if (actual !== declared) {
          errors.push(`${rel}
      pdf_pages: ${declared}
      -> actual page count is ${actual} (public${String(fm.pdf)})`);
        }
      }
    }

    for (const { kind, value } of refs) {
      if (isExternal(value)) continue;
      checked += 1;
      const target = publicPathFor(value);
      if (target === null) {
        errors.push(`${rel}\n      ${kind}: ${value}\n      -> relative path; cannot resolve under public/`);
      } else if (!existsSync(target)) {
        errors.push(`${rel}\n      ${kind}: ${value}\n      -> missing: public${value.split('#')[0].split('?')[0]}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Asset validation failed: ${errors.length} dangling reference(s) across ` +
        `${files.length} content file(s).\n` +
        errors.map((e) => `  - ${e}`).join('\n')
    );
  }

  return { files: files.length, refs: checked };
}
