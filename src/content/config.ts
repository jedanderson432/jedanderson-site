import { defineCollection, z } from 'astro:content';

const CONTENT_TYPES = [
  'essay',
  'paper',
  'post',
  'note',
  'letter',
  'speech',
  'book',
] as const;

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
});

const collection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = {
  essays: collection,
  papers: collection,
  posts: collection,
  notes: collection,
  letters: collection,
  speeches: collection,
  books: collection,
};

export type ContentFrontmatter = z.infer<typeof baseSchema>;
export { CONTENT_TYPES };
