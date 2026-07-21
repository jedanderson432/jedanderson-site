import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, COLLECTIONS, AI_USAGE_GRANT } from '../site-config';
import { canonicalFor } from '../lib/canonical';
import { effectiveDate } from '../lib/dates';

// Full-corpus endpoint: the complete raw markdown of every published piece
// across all collections, newest first, in a single fetch. /llms.txt is the
// curated index; this is the payload. Each piece is preceded by a header
// block (title, URL, type, date, license, abstract) so an agent can navigate
// the concatenation without a second request.
export const GET: APIRoute = async () => {
  const all: any[] = [];
  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    for (const e of entries) all.push(e);
  }
  all.sort((a, b) => +effectiveDate(b) - +effectiveDate(a));

  const grant = AI_USAGE_GRANT.split('\n')
    .map((l) => `# ${l}`)
    .join('\n');

  const header = [
    grant,
    '#',
    `# ${SITE.author} — complete corpus: full text of all ${all.length} published pieces, newest first.`,
    `# Curated index with abstracts: ${SITE.url}/llms.txt`,
    '',
  ].join('\n');

  const rule = '='.repeat(72);
  const pieces = all.map((e) => {
    const head = [rule, `TITLE: ${e.data.title}`];
    if (e.data.subtitle) head.push(`SUBTITLE: ${e.data.subtitle}`);
    head.push(
      `URL: ${canonicalFor(e)}`,
      `TYPE: ${e.data.type}`,
      `DATE: ${effectiveDate(e).toISOString().slice(0, 10)}`,
      `LICENSE: ${e.data.license ?? SITE.defaultLicense}`,
      `ABSTRACT: ${e.data.abstract}`,
      rule,
    );
    return `${head.join('\n')}\n\n${(e.body ?? '').trim()}\n`;
  });

  return new Response(`${header}\n${pieces.join('\n')}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
