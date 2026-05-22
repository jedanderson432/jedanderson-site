// Render the .cover section of the archived bits-protect-its HTML to a portrait JPEG.
// Target 1600x2071 to match the universe-is-information and intelligence-leverage-equation
// hero portraits (the homepage Start Here card uses w-[200px] with no height constraint,
// so a square cover renders ~30% shorter than the portrait covers next to it).
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const sourceHtml = 'C:\\Users\\jedan\\Documents\\corpus-archive\\bits-protect-its--visual.html';
const out = path.join(repo, 'public', 'images', 'bits-protect-its-hero.jpg');

const TARGET_W = 1600;
const TARGET_H = 2071; // matches universe-is-information & intelligence-leverage-equation

const browser = await chromium.launch();
// Render at 2x for crispness, then downscale with sharp.
const ctx = await browser.newContext({
  viewport: { width: TARGET_W, height: TARGET_H },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(pathToFileURL(sourceHtml).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

// Force the .cover to fill exactly TARGET_W x TARGET_H, and scale up the
// title typography so the cover reads strongly at homepage-thumbnail size
// (~200×259 px). The source CSS clamps the title to ~8.5rem; that renders
// the title at ~7% of frame height. The other foundational covers carry a
// title at ~16% of frame height, so we override clamp to push it there.
await page.evaluate(({ w, h }) => {
  const cover = document.querySelector('.cover');
  if (!cover) throw new Error('no .cover element');
  cover.style.width = w + 'px';
  cover.style.height = h + 'px';
  cover.style.minHeight = h + 'px';
  cover.style.maxHeight = h + 'px';
  cover.style.boxSizing = 'border-box';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Scale the title up to fill the frame; let the subtitle grow modestly too.
  const style = document.createElement('style');
  style.textContent = `
    .cover-title { font-size: 18rem !important; line-height: 0.95 !important; margin-bottom: 0.6rem !important; }
    .cover-sub   { font-size: 2.6rem !important; line-height: 1.3 !important; max-width: 1100px !important; margin-top: 2.4rem !important; }
    .cover-eyebrow { font-size: 1.1rem !important; }
    .cover-meta { font-size: 1rem !important; }
    .cover-author .name { font-size: 1.3rem !important; }
    .cover-author { font-size: 1rem !important; }
    .cover-rule { width: 120px !important; height: 3px !important; margin-top: 3rem !important; }
    .cover { padding: 4vw 5vw !important; }
  `;
  document.head.appendChild(style);
}, { w: TARGET_W, h: TARGET_H });
await page.waitForTimeout(200);

const cover = await page.$('.cover');
const raw = await cover.screenshot({ type: 'png' });
await browser.close();

// Downscale 2x → 1x and write as JPEG q88.
const buf = await sharp(raw)
  .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();
fs.writeFileSync(out, buf);
console.log(`wrote ${out} (${buf.length} bytes, ${TARGET_W}x${TARGET_H})`);
