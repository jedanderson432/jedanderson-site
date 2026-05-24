import { defineCollection, z } from 'astro:content';

const CONTENT_TYPES = ['essay', 'post', 'book', 'letter'] as const;

const SUPPORTING_FILE_TYPES = [
  'pdf',
  'deck',
  'video',
  'image',
  'audio',
  'data',
] as const;

const supportingFileSchema = z.object({
  title: z.string().min(1),
  file: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(SUPPORTING_FILE_TYPES),
});

const baseSchema = z.object({
  // Required
  // Note: `slug` is not in the schema. Astro reserves the frontmatter
  // `slug` field for URL routing in legacy content collections — it's
  // consumed before zod validation runs, so it cannot be declared
  // here. It still belongs in every frontmatter block (the spec
  // requires it), and is accessed via `entry.slug` in templates.
  title: z.string().min(1),
  date: z.coerce.date(),
  type: z.enum(CONTENT_TYPES),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string()),
  abstract: z.string().min(1),

  // Required with defaults
  license: z.string().default('CC-BY-4.0'),
  author: z.string().default('Jed Anderson'),
  co_authors: z.array(z.string()).default([]),

  // Optional
  subtitle: z.string().optional(),
  canonical_url: z.string().url().optional(),
  original_source: z.string().optional(),
  original_date: z.coerce.date().optional(),
  pdf: z.string().optional(),
  hero_image: z.string().optional(),
  hero_image_alt: z.string().optional(),
  pdf_canonical: z.boolean().optional(),
  pdf_pages: z.number().int().positive().optional(),
  show_abstract_on_page: z.boolean().optional(),
  show_toc: z.boolean().optional(),
  related_essay: z.string().optional(),
  interactive_url: z.string().optional(),
  interactive_cta: z.string().optional(),

  // When set to "ScholarlyArticle", ContentLayout emits a richer
  // schema.org ScholarlyArticle JSON-LD block instead of the default
  // Article schema. Foundational essays (type: essay AND tags
  // including "foundational") auto-promote to ScholarlyArticle even
  // without this field set.
  schema_type: z.enum(['ScholarlyArticle']).optional(),

  // Placeholder for a Zenodo (or similar) DOI registered against the
  // PDF. When non-empty, emitted as an identifier and sameAs entry in
  // the ScholarlyArticle JSON-LD.
  doi: z.string().optional(),

  // Most recent substantive revision date. When present, emitted as
  // schema.org `dateModified` in the ScholarlyArticle JSON-LD. The
  // canonical publication date (`date`) is never overwritten.
  date_modified: z.coerce.date().optional(),

  // SEO/search keywords for ScholarlyArticle JSON-LD. Distinct from
  // `tags` (which drive on-site organization). When present, used in
  // place of tags as the `keywords` field of the schema block.
  keywords: z.array(z.string()).optional(),

  // Subject-matter entities the page is "about". Each string becomes
  // a schema.org Thing in the ScholarlyArticle `about` array.
  about: z.array(z.string()).optional(),

  // Explicit ordering for the homepage "Start here" section. When set,
  // cornerstone essays sort by this integer ascending (1, 2, 3, ...).
  // Cornerstones without the field fall to the bottom in date-desc order.
  start_here_order: z.number().int().positive().optional(),

  // Decks, videos, charts, posters, and other materials that attach
  // to the writing they serve. The writing is canonical; supporting
  // files are downloadable companions, never standalone collections.
  supporting_files: z.array(supportingFileSchema).default([]),
});

// Books extend the base schema with two book-specific fields.
const bookSchema = baseSchema.extend({
  external_url: z.string().url().optional(),
  isbn: z.string().optional(),
});

const baseCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const bookCollection = defineCollection({
  type: 'content',
  schema: bookSchema,
});

export const collections = {
  essays: baseCollection,
  posts: baseCollection,
  books: bookCollection,
  letters: baseCollection,
};

export type ContentFrontmatter = z.infer<typeof baseSchema>;
export type BookFrontmatter = z.infer<typeof bookSchema>;
export type SupportingFile = z.infer<typeof supportingFileSchema>;
export { CONTENT_TYPES, SUPPORTING_FILE_TYPES };
