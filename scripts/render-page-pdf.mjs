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
console.log(JSON.stringify({ slug, out: path.relative(repo, out), bytes: fs.statSync(out).size }));
process.exit(0);
