// Generate /pdfs/{slug}.pdf for every published piece that doesn't already have one.
// Uses Playwright headless Chrome's page.pdf() against the locally-built dist served on http.
//
// For visual essays (interactive_url in frontmatter), the source is /visual-essays/{slug}/index.html.
// For everything else, the source is the rendered content page (/essays/{slug}/, /posts/{slug}/, etc.).

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const dist = path.join(repo, 'dist');
const pdfsDir = path.join(repo, 'public', 'pdfs');
const auditPath = path.join(repo, 'scripts', '_pdf-audit.json');

// --- audit ---
const audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));
const visualSlugs = new Set(audit.pieces.filter(p => p.interactive_url).map(p => p.slug));

// Pieces that need a PDF: those without a file at /pdfs/{slug}.pdf.
// (Even those that already have a `pdf:` frontmatter pointing at a different filename
// — e.g. first-defender → the-first-defender.pdf — get a fresh one at the slug path.)
const needed = audit.pieces.filter(p => !fs.existsSync(path.join(pdfsDir, `${p.slug}.pdf`)));
console.log(`Pieces needing PDFs: ${needed.length}`);

// --- minimal http server over dist ---
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function serveFile(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/' || urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(dist, urlPath);
  if (!filePath.startsWith(dist)) { res.statusCode = 403; return res.end(); }
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      // fallback: try as directory (append /index.html)
      const alt = path.join(dist, urlPath, 'index.html');
      fs.stat(alt, (err2, st2) => {
        if (err2 || !st2.isFile()) { res.statusCode = 404; return res.end('not found'); }
        const ext = path.extname(alt).toLowerCase();
        res.setHeader('content-type', MIME[ext] || 'application/octet-stream');
        fs.createReadStream(alt).pipe(res);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('content-type', MIME[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(serveFile);
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
console.log(`serving dist at ${base}`);

// --- pdf rendering ---
const COLL_TO_PATH = {
  essays: 'essays', posts: 'posts', books: 'books',
  letters: 'letters', papers: 'papers', notes: 'notes', speeches: 'speeches',
};

async function renderPdf(browser, piece) {
  const slug = piece.slug;
  const out = path.join(pdfsDir, `${slug}.pdf`);
  // Determine source URL
  let url;
  let isVisual = visualSlugs.has(slug);
  if (isVisual) {
    url = `${base}/visual-essays/${slug}/`;
  } else {
    const cp = COLL_TO_PATH[piece.collection];
    url = `${base}/${cp}/${slug}/`;
  }
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.emulateMedia({ media: 'print' });
    // For visual essays we want the dark theme preserved; for prose pages, the screen styling is fine.
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: out,
      format: 'Letter',
      margin: { top: '0.6in', bottom: '0.6in', left: '0.6in', right: '0.6in' },
      printBackground: true,
      preferCSSPageSize: false,
    });
    return { ok: true, slug, bytes: fs.statSync(out).size };
  } catch (e) {
    return { ok: false, slug, err: String(e).slice(0, 200) };
  } finally {
    await page.close().catch(() => {});
    await ctx.close().catch(() => {});
  }
}

const browser = await chromium.launch();
const CONCURRENCY = 6;
let idx = 0;
const failures = [];
let done = 0;
const start = Date.now();

async function worker(i) {
  while (true) {
    const my = idx++;
    if (my >= needed.length) return;
    const piece = needed[my];
    const r = await renderPdf(browser, piece);
    done++;
    if (!r.ok) failures.push(r);
    if (done % 25 === 0 || done === needed.length) {
      const rate = done / ((Date.now() - start) / 1000);
      console.log(`  [${done}/${needed.length}] last=${piece.slug} rate=${rate.toFixed(1)}/s fails=${failures.length}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));

await browser.close();
server.close();

console.log(`\nDone. Wrote ${done - failures.length} PDFs; ${failures.length} failures.`);
if (failures.length) {
  console.log('Failures:');
  for (const f of failures.slice(0, 50)) console.log(`  ${f.slug}: ${f.err}`);
  fs.writeFileSync(path.join(repo, 'scripts', '_pdf-failures.json'), JSON.stringify(failures, null, 2));
}
