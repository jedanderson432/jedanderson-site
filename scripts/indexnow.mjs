// IndexNow build-time push (SECONDARY / belt-and-suspenders).
//
// The PRIMARY IndexNow submission now runs post-deploy from the
// .github/workflows/indexnow.yml GitHub Action, which sleeps for the
// Netlify deploy and then POSTs from the LIVE sitemap — so ownership
// verification (IndexNow fetches /{key}.txt from the host) succeeds.
// This build-time hook is kept as a redundant best-effort ping. It
// fires before the new deploy is live, so it commonly 403s on the
// deploy that introduces new content; that is expected and harmless.
//
// On production builds only (CONTEXT=production), after Astro finishes
// emitting `dist/`, this integration reads the generated sitemap, diffs it
// against the live sitemap (the previous deploy), and POSTs the URLs that
// are new or whose <lastmod> changed to the IndexNow API.
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

// Map of url -> lastmod ('' when absent) from one sitemap XML string.
function extractEntries(xml) {
  const entries = new Map();
  const re = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const loc = /<loc>\s*([^<\s]+)\s*<\/loc>/.exec(m[1]);
    if (!loc) continue;
    const lm = /<lastmod>\s*([^<\s]+)\s*<\/lastmod>/.exec(m[1]);
    entries.set(loc[1].trim(), lm ? lm[1].trim() : '');
  }
  return entries;
}

// Pull every <loc>…</loc> value out of a sitemap index XML string.
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

// url -> lastmod for the sitemap currently live on the site, i.e. the
// previous deploy. Throws if it cannot be read in full, so a failed
// fetch skips the submission instead of resubmitting the whole corpus.
async function fetchLiveEntries() {
  const entries = new Map();
  const fetchText = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
    return res.text();
  };
  const index = await fetchText(`https://${HOST}/sitemap-index.xml`);
  for (const child of extractLocs(index)) {
    for (const [loc, lm] of extractEntries(await fetchText(child))) entries.set(loc, lm);
  }
  return entries;
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
        // Production deploys only (Netlify sets CONTEXT). Local and
        // deploy-preview builds must never ping search engines.
        if (process.env.CONTEXT !== 'production') {
          logger.info('IndexNow: CONTEXT is not "production" — skipping submission.');
          return;
        }
        try {
          const distDir = fileURLToPath(dir);
          let indexXml;
          try {
            indexXml = await readFile(path.join(distDir, 'sitemap-index.xml'), 'utf8');
          } catch {
            logger.warn(
              'IndexNow: sitemap-index.xml not found in build output — skipping submission.'
            );
            return;
          }

          // Sitemap URLs only: not the sitemap index, .md twins, or PDFs.
          const next = new Map();
          const childSitemaps = extractLocs(indexXml);
          for (const child of childSitemaps) {
            const childXml = await readFromDist(distDir, child);
            if (!childXml) continue;
            for (const [loc, lm] of extractEntries(childXml)) {
              if (loc.startsWith(`https://${HOST}`)) next.set(loc, lm);
            }
          }
          if (next.size === 0) {
            logger.warn('IndexNow: no URLs collected from sitemaps — nothing to submit.');
            return;
          }

          // Submit only URLs that are new or whose lastmod changed versus
          // the sitemap on the live (previous) deploy.
          let prev;
          try {
            prev = await fetchLiveEntries();
          } catch (err) {
            logger.warn(`IndexNow: could not read live sitemap, skipping — ${err?.message ?? err}`);
            return;
          }
          const urls = [...next].filter(([loc, lm]) => !prev.has(loc) || prev.get(loc) !== lm).map(([loc]) => loc);

          logger.info(`IndexNow: ${next.size} sitemap URL(s), ${urls.length} new or changed.`);
          if (urls.length === 0) return;

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
