# Discoverability runbook

What the repo already does automatically, and the account-level steps only Jed can do. Check items off by editing this file; it is the durable record of the site's search/AI-discoverability posture.

## What Jed still must do manually (the short list)

1. **Google Search Console**—add Domain property `jedanderson.org`, verify via Cloudflare DNS TXT, submit `sitemap-index.xml`, Request Indexing on the homepage and foundational pieces. Then paste the token into `PUBLIC_GOOGLE_SITE_VERIFICATION` in Netlify.
2. **Bing Webmaster Tools**—import the verified property from Google Search Console (one click), submit the sitemap. Optionally set `PUBLIC_BING_SITE_VERIFICATION`.
3. **Inbound links**—GitHub profile README, LinkedIn About/Featured/post, ORCID + Google Scholar website fields, Substack/Medium bios.
4. **Google Scholar profile**—create it, then replace the TODO placeholder in `src/lib/site-entities.ts` with the profile URL.
5. **Hacker News**—one-shot submission of a foundational essay.
6. **npm publish** of `mcp/` (low priority).

Details for each below.

---

## Automated (already wired into the repo—no action needed)

- **Entity graph**: every page emits a unified `@graph` JSON-LD—Person (`/about#jed-anderson`, with `sameAs` to LinkedIn, enviro.ai, ORCID, Wikidata, SSRN, Hugging Face, GitHub), Organization (EnviroAI), WebSite (with `SearchAction` targeting `/?q={term}`), plus per-page Article / ScholarlyArticle / Book / BlogPosting / DefinedTerm schemas referencing the Person by `@id`. Source: `src/lib/site-entities.ts`, `src/layouts/ContentLayout.astro`.
- **Meta layer**: unique description, canonical, Open Graph (`og:type=article` on content pages), Twitter Card, RSS autodiscovery on every page. Source: `src/layouts/BaseLayout.astro`.
- **Sitemap**: `/sitemap-index.xml` via @astrojs/sitemap, with `<lastmod>` on every content URL from frontmatter dates (`scripts/sitemap-lastmod.mjs`). Conventional guesses (`/sitemap.xml` etc.) 301 to it via `netlify.toml`.
- **robots.txt**: allows all major AI + search crawlers by name, lists the sitemap, points to `/llms.txt` and `/llms-full.txt`.
- **IndexNow push on every deploy**: `.github/workflows/indexnow.yml` waits for the Netlify deploy, reads the live sitemap, and submits the full canonical URL set plus `sitemap-index.xml` to api.indexnow.org (fans out to Bing—which powers ChatGPT Search, Copilot, DuckDuckGo—and Yandex). Key file: `public/ecc6cbaef819e74bdd5b9838122a6858.txt`. A redundant build-time ping runs in `scripts/indexnow.mjs`.
- **Wayback snapshots on every deploy**: `.github/workflows/wayback.yml` saves every canonical URL to the Internet Archive (redundant AI-ingestion surface).
- **AI surfaces**: `/llms.txt`, `/llms-full.txt`, per-page `.md` endpoints, the AI usage grant embedded in every machine surface, MCP server in `mcp/`.

---

## 1. Google Search Console

- [ ] Go to <https://search.google.com/search-console>, sign in with the Google account that should own the property.
- [ ] Add property → **Domain** → `jedanderson.org` (Domain, not URL-prefix—covers http/https/subdomains).
- [ ] Verify via DNS TXT record: copy the `google-site-verification=...` value, add it as a TXT record on `jedanderson.org` in Cloudflare DNS. Propagation is usually minutes.
- [ ] Sitemaps → submit `https://jedanderson.org/sitemap-index.xml`.
- [ ] URL Inspection → **Request Indexing** for the homepage and the foundational pieces (the `foundational`-tagged essays; list at `/llms.txt`).
- [ ] Netlify → Site settings → Environment variables → add `PUBLIC_GOOGLE_SITE_VERIFICATION` = the meta-tag token (Search Console → Settings → Ownership verification → HTML tag; use only the `content="..."` value). Redeploy. This adds meta-tag verification as a second, DNS-independent proof of ownership. Zero code changes needed—BaseLayout emits the tag automatically when the var is set.

## 2. Bing Webmaster Tools

- [ ] Go to <https://www.bing.com/webmasters>, sign in.
- [ ] Use **Import from Google Search Console** (one click; requires step 1 done first).
- [ ] Confirm the sitemap imported; if not, submit `https://jedanderson.org/sitemap-index.xml`.
- [ ] Optional: Netlify env var `PUBLIC_BING_SITE_VERIFICATION` = the `msvalidate.01` token if using meta verification instead of the GSC import.
- Note: IndexNow already pushes every URL to Bing on each deploy, so Bing Webmaster is mostly for monitoring, not discovery.

## 3. Inbound links (crawl on-ramps)

Each verified, indexed page linking to jedanderson.org is a crawl entry point and an entity-resolution signal.

- [ ] **GitHub profile README**: create repo `jedanderson432/jedanderson432` with a README linking to `https://jedanderson.org` (and one line on the corpus).
- [ ] **LinkedIn**: add jedanderson.org to the About section, add it as a Featured link, and make one announcement post linking a foundational essay.
- [ ] **ORCID** (0009-0003-1807-2459): add `https://jedanderson.org` in the Websites field.
- [ ] **Google Scholar**: create the profile; set the website field to `https://jedanderson.org`. Then replace the TODO placeholder in `src/lib/site-entities.ts` (`sameAs` array) with the profile URL.
- [ ] **Substack / Medium**: add the site URL to the bio of any personal account.

## 4. enviro.ai—DO NOT TOUCH

Do **not** edit the enviro.ai property (site, DNS, webmaster accounts) without legal sign-off—hostile co-ownership situation, active counsel. Linking *from* jedanderson.org *to* enviro.ai (already in the JSON-LD) is fine; changes *on* enviro.ai are not.

## 5. Hacker News

- [ ] One-shot submission of a single foundational essay (pick the strongest standalone piece). Even without traction, the submission page is a durable, high-authority backlink. Do not resubmit repeatedly.

## 6. npm publish of the MCP server (low priority)

- [ ] Enable 2FA on the npm account.
- [ ] From `mcp/`: `npm publish --access public --otp=<code>`.
- [ ] Submit the published package to the MCP registry.

---

## Verifying it all works (after deploys)

- Rich results test: <https://search.google.com/test/rich-results> on a content URL—should show Article/ScholarlyArticle with author Person.
- Schema validator: <https://validator.schema.org> on the homepage—one `@graph` with Person, Organization, WebSite nodes.
- IndexNow: GitHub → Actions → "IndexNow submit"—log lists every submitted URL and the HTTP status (200/202 = accepted).
- Sitemap lastmod: `curl https://jedanderson.org/sitemap-0.xml | grep lastmod`.
- Search deep link: `https://jedanderson.org/?q=entropy` should open the search modal pre-searched.
