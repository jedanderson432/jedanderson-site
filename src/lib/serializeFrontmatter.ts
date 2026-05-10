// Hand-rolled YAML frontmatter serializer scoped to our schema's value
// types: strings, dates, numbers, booleans, arrays of strings, and
// arrays of plain objects (block-style, used for supporting_files).
// We avoid pulling in js-yaml just for this — adding a dep purely for
// the .md endpoint isn't worth it, and our schema doesn't need
// general YAML.

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

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    !(v instanceof Date)
  );
}

function formatArray(arr: unknown[]): string {
  if (arr.length === 0) return '[]';
  return `[${arr.map(formatScalar).join(', ')}]`;
}

// Block-style serialization for arrays of plain objects:
//   key:
//     - field1: value1
//       field2: value2
//     - field1: value3
function formatArrayOfObjects(arr: Record<string, unknown>[]): string {
  return arr
    .map((obj) => {
      const keys = Object.keys(obj).filter((k) => obj[k] !== undefined);
      if (keys.length === 0) return '  - {}';
      return keys
        .map((k, i) => {
          const prefix = i === 0 ? '  - ' : '    ';
          return `${prefix}${k}: ${formatScalar(obj[k])}`;
        })
        .join('\n');
    })
    .join('\n');
}

export function serializeFrontmatter(
  data: Record<string, unknown>,
  keyOrder?: string[]
): string {
  // When keyOrder is provided, emit known keys in that order first,
  // then any extras in insertion order. New schema fields show up in
  // the .md output without requiring a serializer change.
  const keys = keyOrder
    ? [
        ...keyOrder.filter((k) => k in data && data[k] !== undefined),
        ...Object.keys(data).filter(
          (k) => !keyOrder.includes(k) && data[k] !== undefined
        ),
      ]
    : Object.keys(data).filter((k) => data[k] !== undefined);
  const lines: string[] = [];
  for (const k of keys) {
    const v = data[k];
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length > 0 && v.every(isPlainObject)) {
        lines.push(`${k}:`);
        lines.push(formatArrayOfObjects(v as Record<string, unknown>[]));
      } else {
        lines.push(`${k}: ${formatArray(v)}`);
      }
    } else {
      lines.push(`${k}: ${formatScalar(v)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---`;
}

// Canonical key order for our schema — keeps the .md endpoint output
// stable and human-readable. Keys not in this list still appear (in
// insertion order, after the ordered ones).
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
  'hero_image_alt',
  'external_url',
  'isbn',
  'supporting_files',
];
