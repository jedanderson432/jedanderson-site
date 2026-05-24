// Site-level constants. Phase 4 finalizes the placeholder values below.
// Anything marked TODO is a placeholder — the user will fill in.

export const SITE = {
  title: 'Jed Anderson',
  subtitle: 'Bits Protect Its.',
  description:
    'Writing on environmental superintelligence, information physics, and the causal sovereignty of knowledge over matter and energy.',
  url: 'https://jedanderson.org',
  author: 'Jed Anderson',
  email: 'jed@jedanderson.org',
  github: 'https://github.com/jedanderson432/jedanderson-site',
  defaultLicense: 'CC-BY-4.0',
  intro:
    'Writer, founder, builder. Working on environmental superintelligence—the thesis that physics-grounded continuous information infrastructure can do for the biosphere what no policy regime has—through EnviroAI and personal research. Writing here on information physics, environmental superintelligence, faith, and the work of building knowledge systems at the scale and speed of the planet. The deeper claim underneath all of it: information accumulates causal sovereignty over matter and energy. We are the part of nature that finally grew old enough to fight back.',
} as const;

// Collection ↔ type mapping. Frontmatter `type` is singular; URLs and
// collection names are plural. Type drives URLs via this table. The
// surviving taxonomy is essays / posts / books — see
// docs/REPO_STRUCTURE.md for the rationale behind the collapse.
export const TYPE_TO_COLLECTION = {
  essay: 'essays',
  post: 'posts',
  book: 'books',
  letter: 'letters',
  speech: 'speeches',
} as const;

export const COLLECTION_TO_TYPE = {
  essays: 'essay',
  posts: 'post',
  books: 'book',
  letters: 'letter',
  speeches: 'speech',
} as const;

export const COLLECTIONS = ['essays', 'posts', 'books', 'letters', 'speeches'] as const;

export const TYPE_LABELS: Record<string, string> = {
  essay: 'Essay',
  post: 'Post',
  book: 'Book',
  letter: 'Letter',
  speech: 'Talk',
};

// Order in which collections appear in the homepage Browse section
// and the header nav.
export const NAV_COLLECTIONS = ['essays', 'posts', 'books', 'speeches', 'letters'] as const;

export type CollectionName = (typeof COLLECTIONS)[number];
