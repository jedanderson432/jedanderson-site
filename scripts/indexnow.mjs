// IndexNow deploy-time push.
//
// On every build, after Astro finishes emitting `dist/`, this integration
// reads the generated sitemap index, follows its child sitemaps, collects
// every https://jedanderson.org/ URL, and POSTs them to the IndexNow API.
// IndexNow fans the submission out to Bing, Yandex, DuckDuckGo, and other
// participating engines — and Bing's index is what ChatGPT Search rides.
//
// Fail-soft contract: this NEVER breaks the build. Any error (no sitemap,
// network failure, non-200 response) is logged and swallowed. The HTTP
// status is always logged so the deploy log records what happened.
//
// The key is a constant here and is also committed at
// public/{INDEXNOW_KEY}.txt so IndexNow can verify ownership by fetching
// https://jedanderson.org/{INDEXNOW_KEY}.txt and matching the body.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const INDEXNOW_KEY = 'ecc6cbaef819e74bdd5b9838122a6858';

const HOST = 'jedanderson.org';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const MAX_PER_REQUEST = 10000;

// Pull every <loc>…</loc> value out of a sitemap XML string.
function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

// Read a file from the build output dir given an absolute URL whose path
// maps into dist/. Returns null if the file isn't present.
async function readFromDist(distDir, url) {
  try {
    const u = new URL(url);
    const rel = u.pathname.replace(/^\//, '');
    const filePath = path.join(distDir, rel);
    return await readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function postBatch(urlList, logger) {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    logger.info(
      `IndexNow: submitted ${urlList.length} URL(s) → HTTP ${res.status} ${res.statusText}`
    );
  } catch (err) {
    // Network-level failure (DNS, timeout, offline build). Fail soft.
    logger.warn(`IndexNow: submission failed (network) — ${err?.message ?? err}`);
  }
}

export function indexNow() {
  return {
    name: 'indexnow',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        try {
          const distDir = fileURLToPath(dir);
          const indexPath = path.join(distDir, 'sitemap-index.xml');

          let indexXml;
          try {
            indexXml = await readFile(indexPath, 'utf8');
          } catch {
            logger.warn(
              'IndexNow: sitemap-index.xml not found in build output — skipping submission.'
            );
            return;
          }

          // The index lists child sitemaps; each child lists page URLs.
          const childSitemaps = extractLocs(indexXml);
          const urlSet = new Set();
          for (const child of childSitemaps) {
            const childXml = await readFromDist(distDir, child);
            if (!childXml) continue;
            for (const loc of extractLocs(childXml)) {
              if (loc.startsWith(`https://${HOST}/`)) urlSet.add(loc);
            }
          }

          const urls = [...urlSet];
          if (urls.length === 0) {
            logger.warn('IndexNow: no URLs collected from sitemaps — nothing to submit.');
            return;
          }

          logger.info(`IndexNow: collected ${urls.length} URL(s) from ${childSitemaps.length} sitemap(s).`);

          // Cap at 10,000 URLs per request; batch if the corpus is larger.
          for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
            await postBatch(urls.slice(i, i + MAX_PER_REQUEST), logger);
          }
        } catch (err) {
          // Absolute backstop — never let IndexNow break the build.
          logger.warn(`IndexNow: unexpected error, skipped — ${err?.message ?? err}`);
        }
      },
    },
  };
}
