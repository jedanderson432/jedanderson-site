// Builds a { canonical path → lastmod ISO date } map from content
// frontmatter, consumed by the sitemap serialize() hook in
// astro.config.mjs so every content URL carries <lastmod>.
//
// Date semantics mirror ContentLayout: frontmatter `date` is the most
// recent revision date (the piece-level convention), overridable by an
// explicit `date_modified`. `original_date` is first publication and is
// deliberately NOT used here — <lastmod> tells crawlers when the
// document last changed, not when the work was first written.
//
// Only published entries matter for the sitemap (drafts are never
// built), but unmatched map entries are harmless — the serialize hook
// looks up by path and leaves non-content pages without lastmod.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const CONTENT_DIR = fileURLToPath(new URL('../src/content', import.meta.url));

// Frontmatter `type` → URL collection segment. Kept in sync with
// TYPE_TO_COLLECTION in src/site-config.ts (this script runs before
// Astro/TS, so it can't import it).
const TYPE_TO_COLLECTION = {
  essay: 'essays',
  post: 'posts',
  book: 'books',
  letter: 'letters',
  speech: 'speeches',
};

function extractFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  try {
    return yaml.load(m[1]);
  } catch {
    return null;
  }
}

function toIsoDate(value) {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export async function buildLastmodMap() {
  const map = new Map();
  let dirs;
  try {
    dirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  } catch {
    return map;
  }

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const collectionDir = path.join(CONTENT_DIR, dir.name);
    const files = await readdir(collectionDir);
    for (const file of files) {
      if (!/\.(md|mdx)$/.test(file)) continue;
      const raw = await readFile(path.join(collectionDir, file), 'utf8');
      const fm = extractFrontmatter(raw);
      if (!fm || !fm.date) continue;

      const slug = fm.slug ?? file.replace(/\.(md|mdx)$/, '');
      const collection = TYPE_TO_COLLECTION[fm.type] ?? dir.name;
      const lastmod = toIsoDate(fm.date_modified ?? fm.date);
      if (!lastmod) continue;

      map.set(`/${collection}/${slug}`, lastmod);
    }
  }
  return map;
}
