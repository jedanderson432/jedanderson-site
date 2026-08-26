// Post-deploy assertion: every related_essay link, over the PUBLIC INTERNET.
//
//   node scripts/check-live-links.mjs [origin]
//
// Deliberately not a build gate. A build gate can only see the tree it is
// building, and the failure mode this guards against is the gap between
// "correct in the repo" and "correct at the URL a reader actually opens" —
// stale deploys, redirect behaviour, a fix that never shipped. Asserting
// against dist/ or 127.0.0.1 cannot see any of that, so this script refuses
// to run against a local origin.
//
// For each piece declaring related_essay it fetches the LIVE page, extracts
// the rendered Related: href, and requires:
//   - the href is root-absolute (a relative href resolves under the current
//     essay's own path and 404s)
//   - the href returns 200 when fetched over the public internet
//
// Exits non-zero on any failure.

const ORIGIN = (process.argv[2] ?? 'https://jedanderson.org').replace(/\/+$/, '');
if (/^https?:\/\/(127\.0\.0\.1|localhost|0\.0\.0\.0|\[::1\])/i.test(ORIGIN)) {
  console.error(`refusing to assert against a local origin: ${ORIGIN}`);
  console.error('this check exists to catch what local verification cannot see');
  process.exit(2);
}

const COLLECTIONS = ['essays', 'posts', 'books', 'letters', 'speeches'];

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'cache-control': 'no-cache' } });
  return { status: res.status, url: res.url, body: res.ok ? await res.text() : '' };
}

// Discover every live page from the sitemap, so this needs no local tree.
const sm = await fetchText(`${ORIGIN}/sitemap-0.xml`);
if (sm.status !== 200) {
  console.error(`could not read sitemap: ${sm.status}`);
  process.exit(2);
}
const pages = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => COLLECTIONS.some((c) => new URL(u).pathname.startsWith(`/${c}/`)));

console.log(`scanning ${pages.length} live content pages at ${ORIGIN}`);

const failures = [];
let withRelated = 0;
const targetCache = new Map();

for (const pageUrl of pages) {
  const page = await fetchText(pageUrl);
  if (page.status !== 200) {
    failures.push(`${pageUrl} -> page returned ${page.status}`);
    continue;
  }
  // ContentLayout emits exactly one "Related:" line, immediately followed by
  // the anchor. Matched directly so this needs no HTML-parser dependency.
  const m = page.body.match(/Related:\s*<a\s+href="([^"]*)"/i);
  if (!m) continue;
  const href = m[1];
  withRelated += 1;

  if (!href.startsWith('/') && !href.startsWith('http')) {
    failures.push(`${pageUrl}\n      related href is RELATIVE: ${href}\n      -> resolves under the essay's own path and 404s`);
    continue;
  }
  const target = href.startsWith('http') ? href : ORIGIN + href;
  if (!targetCache.has(target)) {
    const res = await fetch(target, { redirect: 'follow', method: 'GET' });
    targetCache.set(target, res.status);
  }
  const status = targetCache.get(target);
  if (status !== 200) {
    failures.push(`${pageUrl}\n      related href: ${href}\n      -> ${target} returned ${status}`);
  }
}

console.log(`pages declaring a related link: ${withRelated}`);
if (failures.length) {
  console.error(`\nLIVE RELATED-LINK ASSERTION: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`LIVE RELATED-LINK ASSERTION: PASS — all ${withRelated} related links return 200 at ${ORIGIN}`);
