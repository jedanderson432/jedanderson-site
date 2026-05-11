import { defineCollection, z } from 'astro:content';

const CONTENT_TYPES = ['essay', 'post', 'book'] as const;

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
};

export type ContentFrontmatter = z.infer<typeof baseSchema>;
export type BookFrontmatter = z.infer<typeof bookSchema>;
export type SupportingFile = z.infer<typeof supportingFileSchema>;
export { CONTENT_TYPES, SUPPORTING_FILE_TYPES };
