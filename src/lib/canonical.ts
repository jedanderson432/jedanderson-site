import { SITE, TYPE_TO_COLLECTION } from '../site-config';

// Astro's content-layer entries expose `slug` at the top level
// (auto-derived from filename, overrideable via frontmatter `slug:`)
// and the rest of the frontmatter on `data`. Helpers take this shape.
type EntryLike = {
  slug: string;
  data: {
    type: keyof typeof TYPE_TO_COLLECTION;
    canonical_url?: string;
  };
};

// Build the canonical URL for an entry. Honors an explicit `canonical_url`
// in frontmatter; otherwise derives `{site}/{collection}/{slug}` from
// the type → collection mapping. Type drives URLs.
export function canonicalFor(entry: EntryLike): string {
  if (entry.data.canonical_url) return entry.data.canonical_url;
  const collection = TYPE_TO_COLLECTION[entry.data.type];
  return `${SITE.url}/${collection}/${entry.slug}`;
}

// Same as above but returns just the path portion (for site-relative links).
export function canonicalPath(entry: EntryLike): string {
  const collection = TYPE_TO_COLLECTION[entry.data.type];
  return `/${collection}/${entry.slug}`;
}
