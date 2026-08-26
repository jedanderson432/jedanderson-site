// Render a built content page to public/pdfs/{slug}.pdf via headless Chromium.
//
// The PDF is a print of the real page, not a typeset of the markdown, so it
// inherits the print stylesheet in BaseLayout.astro (site chrome stripped,
// figure blocks preserved, external link URLs appended) and stays in sync
// with whatever the page actually says. Run after `npm run build`.
//
//   node scripts/render-page-pdf.mjs <slug> [collection]
//
// Prints the resulting page count so frontmatter `pdf_pages` can be updated.

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const dist = path.join(repo, 'dist');

const slug = process.argv[2];
const collection = process.argv[3] ?? 'essays';
if (!slug) {
  console.error('usage: node scripts/render-page-pdf.mjs <slug> [collection]');
  process.exit(1);
}
if (!fs.existsSync(path.join(dist, collection, slug, 'index.html'))) {
  console.error(`no built page at dist/${collection}/${slug}/ — run npm run build first`);
  process.exit(1);
}

// Canonical origin, read from src/site-config.ts so this script and the site
// cannot drift apart.
const siteConfig = fs.readFileSync(path.join(repo, 'src', 'site-config.ts'), 'utf-8');
const originMatch = siteConfig.match(/url:\s*['"`](https?:\/\/[^'"`]+)['"`]/);
if (!originMatch) {
  console.error('could not read SITE.url from src/site-config.ts');
  process.exit(1);
}
const SITE_ORIGIN = originMatch[1].replace(/\/+$/, '');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.pdf': 'application/pdf', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/' || urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.join(dist, urlPath);
  if (!filePath.startsWith(dist)) { res.statusCode = 403; return res.end(); }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(dist, urlPath, 'index.html');
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.statusCode = 404; return res.end('not found');
  }
  res.setHeader('content-type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
// deviceScaleFactor 2 so raster images are embedded above screen resolution
// rather than downsampled to the CSS pixel grid.
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`${base}/${collection}/${slug}/`, { waitUntil: 'networkidle', timeout: 60000 });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => document.fonts.ready);
// Decode every image before printing so none render as a blank box.
await page.evaluate(() => Promise.all(
  [...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {}))
));

// Chromium resolves hrefs against the page's own origin when it writes PDF
// link annotations, so a root-relative href like /essays/foo becomes
// http://127.0.0.1:<ephemeral-port>/essays/foo — dead the moment the render
// server exits. Rewrite internal links to the canonical origin first, and
// mark them so the print stylesheet keeps suppressing the URL appendix (an
// internal link is now http-scheme, which would otherwise match the rule
// that prints external URLs inline).
const rewritten = await page.evaluate((origin) => {
  const links = [...document.querySelectorAll('a[href^="/"]')];
  for (const a of links) {
    a.setAttribute('data-internal-link', '');
    a.setAttribute('href', origin + a.getAttribute('href'));
  }
  return links.length;
}, SITE_ORIGIN);

const out = path.join(repo, 'public', 'pdfs', `${slug}.pdf`);
await page.pdf({
  path: out,
  format: 'Letter',
  margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
  printBackground: true,
  preferCSSPageSize: false,
  outline: true,
  tagged: true,
});

await browser.close();
server.close();
console.log(JSON.stringify({
  slug, out: path.relative(repo, out),
  bytes: fs.statSync(out).size, internalLinksRewritten: rewritten,
}));
process.exit(0);
