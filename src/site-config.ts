// Site-level constants. Phase 4 finalizes the placeholder values below.
// Anything marked TODO is a placeholder — the user will fill in.

export const SITE = {
  title: 'Jed Anderson',
  subtitle: 'Bits Protect Its.',
  description:
    'Writing on environmental superintelligence, information physics, and the causal sovereignty of knowledge over matter and energy.',
  url: 'https://jedanderson.org',
  author: 'Jed Anderson',
  email: 'jedanderson432@gmail.com',
  github: 'https://github.com/JedAnderson432/jedanderson-site',
  defaultLicense: 'CC-BY-4.0',
  intro:
    'Writer, founder, builder. Working on environmental superintelligence — the thesis that physics-grounded continuous information infrastructure can do for the biosphere what no policy regime has — through EnviroAI and personal research. Writing here on information physics, environmental superintelligence, faith, and the work of building knowledge systems at the scale and speed of the planet. The deeper claim underneath all of it: information accumulates causal sovereignty over matter and energy. We are the part of nature that finally grew old enough to fight back.',
} as const;

// Collection ↔ type mapping. Frontmatter `type` is singular; URLs and
// collection names are plural. Type drives URLs via this table.
export const TYPE_TO_COLLECTION = {
  essay: 'essays',
  paper: 'papers',
  post: 'posts',
  note: 'notes',
  letter: 'letters',
  speech: 'speeches',
  book: 'books',
} as const;

export const COLLECTION_TO_TYPE = {
  essays: 'essay',
  papers: 'paper',
  posts: 'post',
  notes: 'notes',
  letters: 'letter',
  speeches: 'speech',
  books: 'book',
} as const;

export const COLLECTIONS = [
  'essays',
  'papers',
  'posts',
  'notes',
  'letters',
  'speeches',
  'books',
] as const;

export const TYPE_LABELS: Record<string, string> = {
  essay: 'Essay',
  paper: 'Paper',
  post: 'Post',
  note: 'Note',
  letter: 'Letter',
  speech: 'Speech',
  book: 'Book',
};

// Order in which collections appear on Browse / nav.
export const NAV_COLLECTIONS = ['essays', 'papers', 'posts'] as const;

export type CollectionName = (typeof COLLECTIONS)[number];
