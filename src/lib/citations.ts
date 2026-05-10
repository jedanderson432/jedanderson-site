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

export function bibtex(c: CitationInput, today: Date = new Date()): string {
  const year = c.date.getUTCFullYear();
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
