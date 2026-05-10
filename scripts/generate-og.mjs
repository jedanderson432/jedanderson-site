// One-off script that renders /public/og-default.png from an inline SVG.
// Run with `node scripts/generate-og.mjs`. Re-run if the palette,
// title, or subtitle change.
//
// Sharp is already present transitively via Astro's image pipeline,
// so this script doesn't add a new dependency.

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'public', 'og-default.png');

const W = 1200;
const H = 630;

// Palette mirrors tailwind.config.mjs.
const PAPER = '#fbfaf6';
const INK = '#1a1a1a';
const ACCENT = '#7a5a3a'; // warm umber
const RULE = '#e6e3da';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- Hairline frame for a printed-page feel -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${RULE}" stroke-width="1"/>

  <!-- Title -->
  <text
    x="${W / 2}"
    y="${H / 2 - 30}"
    text-anchor="middle"
    fill="${INK}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="96"
    font-weight="500"
  >Jed Anderson</text>

  <!-- Warm-umber rule between title and subtitle -->
  <line
    x1="${W / 2 - 80}"
    y1="${H / 2 + 20}"
    x2="${W / 2 + 80}"
    y2="${H / 2 + 20}"
    stroke="${ACCENT}"
    stroke-width="1.5"
  />

  <!-- Subtitle -->
  <text
    x="${W / 2}"
    y="${H / 2 + 80}"
    text-anchor="middle"
    fill="${INK}"
    font-family="'Iowan Old Style', Palatino, Georgia, serif"
    font-size="42"
    font-style="italic"
    font-weight="400"
  >Bits Protect Its.</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
