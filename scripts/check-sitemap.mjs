// Sweep a deployed site against the URL conventions:
//   - every sitemap URL returns 200
//   - every sitemap URL + "/" 301s to the no-slash form
//   - .md twins: 200, text/markdown, Link rel=canonical -> a URL returning 200
//   - HTML pages: no X-Robots-Tag, no noindex meta
// Usage: node scripts/check-sitemap.mjs [baseUrl]   (default https://jedanderson.org)
const BASE = (process.argv[2] || 'https://jedanderson.org').replace(/\/+$/, '');
const PROD = 'https://jedanderson.org';
const toBase = (u) => u.replace(PROD, BASE);

async function pool(items, fn, n = 10) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]); }
  }));
  return out;
}
const head = (url) => fetch(url, { method: 'HEAD', redirect: 'manual' });
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const sample = (a, n) => [...a].sort(() => Math.random() - 0.5).slice(0, n);
let failures = 0;
const fail = (msg) => { failures++; console.log('FAIL', msg); };

const index = await (await fetch(`${BASE}/sitemap-index.xml`)).text();
const urls = [];
for (const child of locs(index)) urls.push(...locs(await (await fetch(toBase(child))).text()));
const pages = urls.map(toBase);
console.log(`Sitemap: ${pages.length} URLs`);

console.log('\n[1] HEAD every sitemap URL');
const r1 = await pool(pages, head);
r1.forEach((r, i) => { if (r.status !== 200) fail(`${pages[i]} -> ${r.status} ${r.headers.get('location') ?? ''}`); });

console.log('\n[2] Trailing-slash variants must 301 to the no-slash form');
const slashable = pages.filter((u) => new URL(u).pathname !== '/');
const r2 = await pool(slashable, (u) => head(u + '/'));
r2.forEach((r, i) => {
  const want = slashable[i];
  const loc = r.headers.get('location');
  const abs = loc && new URL(loc, want).toString();
  if (r.status !== 301 || abs !== want) fail(`${want}/ -> ${r.status} ${loc ?? ''}`);
});

console.log('\n[3] 10 random .md twins');
const mdCandidates = pages.filter((u) => /\/(essays|posts|books|letters|speeches)\//.test(u)).map((u) => u + '.md');
await pool(sample(mdCandidates, 10), async (u) => {
  const r = await head(u);
  const link = r.headers.get('link') ?? '';
  const m = link.match(/<([^>]+)>;\s*rel="canonical"/);
  const ct = r.headers.get('content-type') ?? '';
  if (r.status !== 200) return fail(`${u} -> ${r.status}`);
  if (!ct.startsWith('text/markdown')) fail(`${u} content-type ${ct}`);
  if (!m) return fail(`${u} missing Link rel=canonical (got "${link}")`);
  const target = (await head(toBase(m[1]))).status;
  if (target !== 200) fail(`${u} canonical ${m[1]} -> ${target}`);
  if (m[1] !== PROD + new URL(u).pathname.replace(/\.md$/, '')) fail(`${u} canonical points at ${m[1]}`);
});

console.log('\n[4] 10 random HTML pages: no noindex');
await pool(sample(pages, 10), async (u) => {
  const r = await fetch(u);
  const html = await r.text();
  if (r.headers.get('x-robots-tag')) fail(`${u} X-Robots-Tag: ${r.headers.get('x-robots-tag')}`);
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) fail(`${u} has noindex meta`);
});

console.log(failures ? `\n${failures} failure(s)` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
