import type { APIRoute } from 'astro';
import { LICENSE_LINE } from '../site-config';
import { buildLlmsTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
  const body = await buildLlmsTxt();
  return new Response(`# ${LICENSE_LINE}\n\n${body}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
