// Build-time gate: every content file must have a kebab-case slug.
// Checked source: explicit `slug:` in frontmatter if present, otherwise
// the filename (Astro's auto-derived slug). Throws on any violation —
// build/dev/sync all fail. Wired into astro.config.mjs.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, basename, join, relative } from 'node:path';
import { glob } from 'tinyglobby';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_ROOT = join(ROOT, 'src', 'content');

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const COLLECTIONS = [
  'essays',
  'papers',
  'posts',
  'notes',
  'letters',
  'speeches',
  'books',
];

// Pull the value of a top-level `slug:` line out of the YAML
// frontmatter block. Doesn't try to be a full YAML parser — handles
// quoted (single/double) and unquoted scalar strings, which is the
// shape our schema uses.
function extractFrontmatterSlug(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  const fm = raw.slice(3, end);
  const m = fm.match(/^slug:\s*(.+?)\s*$/m);
  if (!m) return null;
  let v = m[1].trim();
  // Strip wrapping quotes if present.
  if (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    v = v.slice(1, -1);
  }
  return v;
}

export async function validateSlugs() {
  const patterns = COLLECTIONS.map((c) => `src/content/${c}/**/*.{md,mdx}`);
  const files = await glob(patterns, { cwd: ROOT, absolute: true });

  const errors = [];
  for (const file of files) {
    const raw = await readFile(file, 'utf-8');
    const explicit = extractFrontmatterSlug(raw);
    const derived = basename(file).replace(/\.(md|mdx)$/, '');
    const slug = explicit ?? derived;
    const source = explicit ? 'frontmatter' : 'filename';

    if (!KEBAB.test(slug)) {
      errors.push({
        file: relative(ROOT, file),
        slug,
        source,
      });
    }
  }

  if (errors.length > 0) {
    const lines = errors.map(
      (e) =>
        `  • ${e.file}\n      slug "${e.slug}" (from ${e.source}) is not kebab-case`
    );
    const msg =
      `\nSlug validation failed (${errors.length} ${errors.length === 1 ? 'file' : 'files'}):\n` +
      lines.join('\n') +
      `\n\nSlugs must match /^[a-z0-9]+(?:-[a-z0-9]+)*$/ — lowercase letters, digits, hyphen-separated.\n`;
    throw new Error(msg);
  }
}
