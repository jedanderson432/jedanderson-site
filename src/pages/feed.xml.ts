import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE, COLLECTIONS } from '../site-config';
import { canonicalFor } from '../lib/canonical';

export async function GET(context: APIContext) {
  const all: any[] = [];
  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    for (const e of entries) all.push(e);
  }
  all.sort((a, b) => +b.data.date - +a.data.date);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: all.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.abstract,
      link: canonicalFor(e),
      content: e.body,
      categories: e.data.tags,
      author: e.data.author,
    })),
    customData: '<language>en-us</language>',
  });
}
