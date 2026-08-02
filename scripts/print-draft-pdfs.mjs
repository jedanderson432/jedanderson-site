// Print the draft-essay HTML produced by scripts/make-draft-pdfs.py to
// public/pdfs/{slug}.pdf, and capture a page image of each rendered page so the
// output can be verified visually rather than by byte extraction.
//
// Run: node scripts/print-draft-pdfs.mjs

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const htmlDir = path.join(repo, 'scripts', '_draft-pdf-html');
const pdfDir = path.join(repo, 'public', 'pdfs');
const shotDir = path.join(repo, 'scripts', '_draft-pdf-shots');

fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(shotDir, { recursive: true });

const slugs = ['it-has-never-read-a-river', 'environmental-safety-mode'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

for (const slug of slugs) {
  const src = path.join(htmlDir, `${slug}.html`);
  if (!fs.existsSync(src)) {
    console.error(`missing ${src} — run scripts/make-draft-pdfs.py first`);
    continue;
  }
  await page.goto('file:///' + src.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  const out = path.join(pdfDir, `${slug}.pdf`);
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '22mm', left: '18mm', right: '18mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="width:100%;font-size:7.5pt;color:#8a8a8a;padding:0 18mm;' +
      'font-family:Georgia,serif;display:flex;justify-content:space-between;">' +
      '<span>jedanderson.org</span><span class="pageNumber"></span></div>',
  });
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`wrote ${out} (${kb} KB)`);

  // page images for visual verification
  await page.screenshot({ path: path.join(shotDir, `${slug}-top.png`), clip: { x: 0, y: 0, width: 1000, height: 1400 } });
  const h = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate(() => window.scrollTo(0, Math.round(document.body.scrollHeight / 2)));
  await page.screenshot({ path: path.join(shotDir, `${slug}-mid.png`) });
  console.log(`  page height ${h}px; shots written`);
}

await browser.close();
console.log('done');
