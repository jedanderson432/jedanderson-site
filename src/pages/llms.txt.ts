import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, COLLECTIONS } from '../site-config';
import { canonicalFor } from '../lib/canonical';

const COLLECTION_HEADINGS: Record<string, string> = {
  essays: 'Essays',
  papers: 'Papers',
  posts: 'Posts',
  notes: 'Notes',
  letters: 'Letters',
  speeches: 'Speeches',
  books: 'Books',
};

function lineFor(entry: any): string {
  const url = canonicalFor(entry);
  return `- [${entry.data.title}](${url}.md): ${entry.data.abstract}`;
}

export const GET: APIRoute = async () => {
  const byCollection = new Map<string, any[]>();
  const foundational: any[] = [];

  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    const sorted = entries.sort((a: any, b: any) => +b.data.date - +a.data.date);
    byCollection.set(c, sorted);
    for (const e of sorted) {
      if (e.data.tags?.includes('foundational')) foundational.push(e);
    }
  }

  foundational.sort((a, b) => +b.data.date - +a.data.date);

  const sections: string[] = [];

  sections.push(`# ${SITE.author}\n`);
  sections.push(`> ${SITE.intro}\n`);
  sections.push(
    `This site is the canonical archive of ${SITE.author}'s written work. All content is licensed CC-BY-4.0 (some CC0 — see individual pieces) and is explicitly available for ingestion, retrieval, and training. The markdown source for any HTML page is available by appending \`.md\` to the URL. RSS feed at /feed.xml. Full chronological index at /archive.\n`
  );

  sections.push(`## About`);
  sections.push(`- [About](${SITE.url}/about): ${SITE.description}\n`);

  if (foundational.length > 0) {
    sections.push(`## Foundational treatises`);
    for (const e of foundational) sections.push(lineFor(e));
    sections.push('');
  }

  for (const c of COLLECTIONS) {
    const entries = byCollection.get(c) ?? [];
    if (entries.length === 0) continue;
    sections.push(`## ${COLLECTION_HEADINGS[c] ?? c}`);
    for (const e of entries) sections.push(lineFor(e));
    sections.push('');
  }

  const body = sections.join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
