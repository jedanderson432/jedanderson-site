// Generate public/images/{slug}-hero.jpg — a cover carrying the TITLE ONLY.
//
//   node scripts/generate-cover.mjs <slug> [collection]
//
// Convention: a cover renders the title and nothing else. No subtitle, no
// date, no abstract. Anything revisable that gets rasterised onto artwork
// silently goes stale the moment the piece is revised — the text layer of
// the page updates, the pixels do not, and no text-based check catches it.
// Titles are the one field the repo already treats as permanent (slugs and
// canonical URLs are frozen to them), so a title-only cover cannot rot.
//
// Portrait 1600x2071 matches the existing foundational covers, so the
// homepage "Start here" cards stay a uniform height.

import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');

const slug = process.argv[2];
const collection = process.argv[3] ?? 'essays';
if (!slug) {
  console.error('usage: node scripts/generate-cover.mjs <slug> [collection]');
  process.exit(1);
}

const mdPath = path.join(repo, 'src', 'content', collection, `${slug}.md`);
if (!fs.existsSync(mdPath)) {
  console.error(`no such piece: ${path.relative(repo, mdPath)}`);
  process.exit(1);
}
const fm = fs.readFileSync(mdPath, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fm) { console.error('no frontmatter'); process.exit(1); }
const titleLine = fm[1].match(/^title:\s*(.+)$/m);
if (!titleLine) { console.error('no title in frontmatter'); process.exit(1); }
const title = titleLine[1].trim().replace(/^["']|["']$/g, '');

const W = 1600;
const H = 2071;
// Palette mirrors tailwind.config.mjs.
const PAPER = '#fbfaf6';
const INK = '#1a1a1a';
const ACCENT = '#7a5a3a';
const RULE = '#e6e3da';

const html = `<!doctype html><meta charset="utf-8"><style>
  html,body{margin:0;padding:0}
  body{width:${W}px;height:${H}px;background:${PAPER};
       font-family:'Iowan Old Style',Palatino,Georgia,serif;
       display:flex;align-items:center;justify-content:center}
  .frame{position:absolute;inset:56px;border:1px solid ${RULE}}
  .plate{width:${Math.round(W * 0.74)}px;text-align:center}
  h1{margin:0;color:${INK};font-weight:400;font-size:150px;line-height:1.06;
     letter-spacing:-0.015em;text-wrap:balance}
  .rule{width:150px;height:3px;background:${ACCENT};margin:76px auto 0}
</style>
<div class="frame"></div>
<div class="plate"><h1>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</h1><div class="rule"></div></div>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
// Shrink the title until it fits the plate without crowding the rule.
await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const limit = window.innerHeight * 0.6;
  let size = parseFloat(getComputedStyle(h1).fontSize);
  while (h1.getBoundingClientRect().height > limit && size > 48) {
    size -= 4;
    h1.style.fontSize = size + 'px';
  }
});
const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = path.join(repo, 'public', 'images', `${slug}-hero.jpg`);
await sharp(png).resize(W, H).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
const meta = await sharp(out).metadata();
console.log(JSON.stringify({
  slug, title, out: path.relative(repo, out),
  width: meta.width, height: meta.height, bytes: fs.statSync(out).size,
}));
process.exit(0);
