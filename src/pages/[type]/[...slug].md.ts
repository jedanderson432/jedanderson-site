import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { COLLECTIONS } from '../../site-config';
import { canonicalFor } from '../../lib/canonical';
import {
  serializeFrontmatter,
  FRONTMATTER_KEY_ORDER,
} from '../../lib/serializeFrontmatter';

// Raw-markdown endpoint. Same paths as the .astro view; AI agents fetch
// this URL to ingest canonical source without parsing HTML.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];
  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    for (const entry of entries) {
      paths.push({
        params: { type: c, slug: entry.slug },
        props: { entry },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = ({ props }) => {
  const entry = (props as any).entry;
  const data: Record<string, unknown> = { ...entry.data };
  // Slug isn't on data (Astro reserves it); reattach for the
  // markdown frontmatter so the .md output stays self-describing.
  data.slug = entry.slug;
  if (!data.canonical_url) data.canonical_url = canonicalFor(entry);

  const yaml = serializeFrontmatter(data, FRONTMATTER_KEY_ORDER);
  const body = `${yaml}\n\n${entry.body}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
