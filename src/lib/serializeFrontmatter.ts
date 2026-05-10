// Hand-rolled YAML frontmatter serializer scoped to our schema's value
// types: strings, dates, numbers, booleans, and arrays of strings. We
// avoid pulling in js-yaml just for this — adding a dep purely for the
// .md endpoint isn't worth it, and our schema doesn't need general YAML.

function quote(s: string): string {
  // Always single-quoted with internal single quotes doubled — handles
  // colons, hashes, leading dashes, etc. without per-character logic.
  return `'${s.replace(/'/g, "''")}'`;
}

function formatScalar(v: unknown): string {
  if (v === null || v === undefined) return 'null';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string') return quote(v);
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  return quote(String(v));
}

function formatArray(arr: unknown[]): string {
  if (arr.length === 0) return '[]';
  return `[${arr.map(formatScalar).join(', ')}]`;
}

export function serializeFrontmatter(
  data: Record<string, unknown>,
  keyOrder?: string[]
): string {
  const keys =
    keyOrder ?? Object.keys(data).filter((k) => data[k] !== undefined);
  const lines: string[] = [];
  for (const k of keys) {
    const v = data[k];
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      lines.push(`${k}: ${formatArray(v)}`);
    } else {
      lines.push(`${k}: ${formatScalar(v)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---`;
}

// Canonical key order for our schema — keeps the .md endpoint output
// stable and human-readable.
export const FRONTMATTER_KEY_ORDER = [
  'title',
  'subtitle',
  'slug',
  'date',
  'type',
  'status',
  'tags',
  'abstract',
  'license',
  'author',
  'co_authors',
  'canonical_url',
  'original_source',
  'original_date',
  'pdf',
  'hero_image',
];
