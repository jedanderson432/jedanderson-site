// Generates /public/og-lines.png for the /lines page.
// Re-run with `node scripts/generate-og-lines.mjs` if the wording changes.
// Same compositional pattern as scripts/generate-og.mjs.

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'public', 'og-lines.png');

const W = 1200;
const H = 630;

const PAPER = '#fbfaf6';
const INK = '#1a1a1a';
const MUTED = '#6b6b6b';
const ACCENT = '#7a5a3a';
const RULE = '#e6e3da';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- Hairline frame for a printed-page feel -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${RULE}" stroke-width="1"/>

  <!-- Primary line, italic serif, centered -->
  <text
    x="${W / 2}"
    y="${H / 2 - 50}"
    text-anchor="middle"
    fill="${INK}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="58"
    font-style="italic"
    font-weight="500"
  >Sentences that carry the thesis.</text>

  <!-- Subtitle, regular weight, muted -->
  <text
    x="${W / 2}"
    y="${H / 2 + 20}"
    text-anchor="middle"
    fill="${MUTED}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="34"
    font-weight="400"
  >Each links to the essay it distills.</text>

  <!-- Warm-umber rule -->
  <line
    x1="${W / 2 - 80}"
    y1="${H / 2 + 70}"
    x2="${W / 2 + 80}"
    y2="${H / 2 + 70}"
    stroke="${ACCENT}"
    stroke-width="1.5"
  />

  <!-- Attribution -->
  <text
    x="${W / 2}"
    y="${H / 2 + 125}"
    text-anchor="middle"
    fill="${INK}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="28"
    font-weight="400"
  >— Jed Anderson</text>

  <!-- Bottom URL slug -->
  <text
    x="${W / 2}"
    y="${H - 70}"
    text-anchor="middle"
    fill="${MUTED}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="22"
    font-weight="400"
  >jedanderson.org/lines</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
