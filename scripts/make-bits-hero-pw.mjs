// Render the .cover section of the archived bits-protect-its HTML to a 1200x1200 JPEG.
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const sourceHtml = 'C:\\Users\\jedan\\Documents\\corpus-archive\\bits-protect-its--visual.html';
const out = path.join(repo, 'public', 'images', 'bits-protect-its-hero.jpg');

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 1200 },
  deviceScaleFactor: 2, // ~retina; effective render ~2400x2400 downsampled to 1200x1200 — close to 300 DPI equivalent
});
const page = await ctx.newPage();
await page.goto(pathToFileURL(sourceHtml).href, { waitUntil: 'networkidle' });

// Wait for web fonts
await page.evaluate(() => document.fonts.ready);
// Brief settle for any layout adjustment
await page.waitForTimeout(800);

// Locate the cover and force-size it to 1200x1200 for the render, then screenshot just that element.
await page.evaluate(() => {
  const cover = document.querySelector('.cover');
  if (!cover) throw new Error('no .cover element');
  // Force a square box so the crop is tight
  cover.style.minHeight = '1200px';
  cover.style.height = '1200px';
  cover.style.width = '1200px';
  cover.style.boxSizing = 'border-box';
  // Make sure nothing leaks
  document.documentElement.style.overflow = 'hidden';
});
await page.waitForTimeout(200);

const cover = await page.$('.cover');
await cover.screenshot({ path: out, type: 'jpeg', quality: 88 });
await browser.close();
console.log('wrote', out);
