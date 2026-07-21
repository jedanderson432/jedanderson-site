import type { APIRoute } from 'astro';
import { AI_USAGE_GRANT } from '../site-config';
import { buildLlmsTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
  const grant = AI_USAGE_GRANT.split('\n')
    .map((l) => `# ${l}`)
    .join('\n');
  const body = await buildLlmsTxt();
  return new Response(`${grant}\n\n${body}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
