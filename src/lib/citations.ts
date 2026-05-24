import { SITE } from '../site-config';

type CitationInput = {
  title: string;
  slug: string;
  date: Date;
  canonicalUrl: string;
  author?: string;
  coAuthors?: string[];
};

const LONG_DATE = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

function authorList(c: CitationInput): string[] {
  return [c.author ?? SITE.author, ...(c.coAuthors ?? [])];
}

// "Anderson, J." -> for APA-style abbreviated initials
function abbrev(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop()!;
  const initials = parts.map((p) => p[0]?.toUpperCase() + '.').join(' ');
  return `${last}, ${initials}`;
}

// "Anderson, Jed." -> for MLA full surname-first
function surnameFirst(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop()!;
  return `${last}, ${parts.join(' ')}`;
}

// Per-slug BibTeX overrides. When a piece carries a hand-authored
// inline BibTeX block in its body (typically in a "How to cite this
// page" section), the auto-generated Cite-this widget must reproduce
// it verbatim so the two never drift. Register the canonical form
// here; APA and MLA continue to derive from the default fields.
const BIBTEX_OVERRIDES: Record<
  string,
  { key: string; title: string; author: string; note: string }
> = {
  'bond-bit-ratio': {
    key: 'anderson2026bondbit',
    title:
      'The Bond-Bit Ratio: A derivation of why information is at least 240{\\texttimes} cheaper than force',
    author: 'Anderson, Jed',
    note:
      "Derives the floor ratio between Landauer's bound at 300 K and one C--H bond enthalpy.",
  },
};

export function bibtex(c: CitationInput, today: Date = new Date()): string {
  const year = c.date.getUTCFullYear();
  const override = BIBTEX_OVERRIDES[c.slug];
  if (override) {
    return [
      `@misc{${override.key},`,
      `  author = {${override.author}},`,
      `  title  = {${override.title}},`,
      `  year   = {${year}},`,
      `  url    = {${c.canonicalUrl}},`,
      `  note   = {${override.note}}`,
      `}`,
    ].join('\n');
  }
  const todayIso = today.toISOString().slice(0, 10);
  const authors = authorList(c).join(' and ');
  const key = `anderson_${year}_${c.slug.replace(/-/g, '_')}`;
  return [
    `@misc{${key},`,
    `  author = {${authors}},`,
    `  title  = {${c.title}},`,
    `  year   = {${year}},`,
    `  url    = {${c.canonicalUrl}},`,
    `  note   = {Accessed: ${todayIso}}`,
    `}`,
  ].join('\n');
}

export function apa(c: CitationInput): string {
  const year = c.date.getUTCFullYear();
  const authors = authorList(c).map(abbrev).join(', ');
  return `${authors} (${year}). ${c.title}. Retrieved from ${c.canonicalUrl}`;
}

export function mla(c: CitationInput): string {
  const authors = authorList(c).map(surnameFirst).join(', ');
  const dateLong = LONG_DATE.format(c.date);
  return `${authors}. "${c.title}." ${SITE.title}, ${dateLong}, ${c.canonicalUrl}.`;
}
