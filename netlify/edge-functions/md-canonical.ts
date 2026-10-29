import type { Context } from "https://edge.netlify.com";

// Every HTML page has a .md twin. The twin is intentionally crawlable
// (AI ingestion), so it carries a canonical hint instead of a noindex:
// Link: <html-url>; rel="canonical".
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const response = await context.next();
  if (!url.pathname.endsWith(".md") || response.status !== 200) return response;

  const canonical = `https://jedanderson.org${url.pathname.slice(0, -3)}`;
  response.headers.set("Link", `<${canonical}>; rel="canonical"`);
  return response;
};
