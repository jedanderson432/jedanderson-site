// Build-time gate: any piece carrying a "## Revision history" section must
// also declare `date_modified` in its frontmatter. Throws on any violation —
// build/dev/sync all fail. Wired into astro.config.mjs.
//
// Why gate this. A revision changes what the page says, but nothing else
// moves on its own: schema.org `dateModified` and the sitemap's <lastmod>
// both fall back to `date`, which is first publication and must not change.
// So a revised piece with no `date_modified` tells crawlers it has not been
// touched since it was published — the revision is invisible to exactly the
// systems that decide whether to re-read it. The revision-history section is
// the reliable marker that a revision happened, so it is the natural trigger.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { glob } from 'tinyglobby';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const COLLECTIONS = [
  'essays',
  'papers',
  'posts',
  'notes',
  'letters',
  'speeches',
  'books',
];

// Matches an H2 named "Revision history", case-insensitively, at the start
// of a line. Trailing content (e.g. an explicit heading id) is tolerated.
const REVISION_HEADING = /^##\s+revision history\b/im;

function splitFrontmatter(raw) {
  if (!raw.startsWith('---')) return { fm: '', body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { fm: '', body: raw };
  return { fm: raw.slice(3, end), body: raw.slice(end + 4) };
}

export async function validateRevisionHistory() {
  const patterns = COLLECTIONS.map((c) => `src/content/${c}/**/*.{md,mdx}`);
  const files = await glob(patterns, { cwd: ROOT, absolute: true });

  const errors = [];
  for (const file of files) {
    const raw = await readFile(file, 'utf-8');
    const { fm, body } = splitFrontmatter(raw);
    if (!REVISION_HEADING.test(body)) continue;
    if (!/^date_modified:\s*\S/m.test(fm)) {
      errors.push(relative(ROOT, file));
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Revision-history validation failed: ${errors.length} file(s) have a ` +
        `"## Revision history" section but no \`date_modified\` in frontmatter. ` +
        `Set date_modified to the date of the most recent revision-history ` +
        `entry so schema.org dateModified and the sitemap <lastmod> reflect ` +
        `the revision:\n` +
        errors.map((f) => `  - ${f}`).join('\n')
    );
  }

  return { checked: files.length };
}
