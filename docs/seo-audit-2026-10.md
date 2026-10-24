# SEO audit: URL variants and .md twins (2026-10-22)

Triggered by Google Search Console: Indexed 1.46K, Not indexed 1.83K (alternate page with proper canonical 707, page with redirect 214, crawled not indexed 898, 404 4, 5xx 2).

## Live probe (curl -sI, 2026-10-22)

No response carried `X-Robots-Tag` or `Link` headers.

| URL | Status | Location | Content-Type |
|---|---|---|---|
| https://jedanderson.org/ | 200 | | text/html; charset=UTF-8 |
| /about | 301 | /about/ | text/html |
| /about/ | 200 | | text/html; charset=UTF-8 |
| /talks | 301 | /talks/ | text/html |
| /talks/ | 200 | | text/html; charset=UTF-8 |
| /essays | 301 | /essays/ | text/html |
| /essays/ | 200 | | text/html; charset=UTF-8 |
| /essays/first-defender | 301 | /essays/first-defender/ | text/html |
| /essays/first-defender/ | 200 | | text/html; charset=UTF-8 |
| /essays/first-defender.md | 200 | | text/markdown; charset=utf-8 |
| /posts/0-or-1 | 301 | /posts/0-or-1/ | text/html |
| /posts/0-or-1/ | 200 | | text/html; charset=UTF-8 |
| /tags/physics | 301 | /tags/physics/ | text/html |
| /tags/physics/ | 200 | | text/html; charset=UTF-8 |
| /pdfs/first-defender.pdf | 200 | | application/pdf |
| http://jedanderson.org/ | 301 | https://jedanderson.org/ | text/plain; charset=utf-8 |
| https://www.jedanderson.org/ | 301 | https://jedanderson.org/ | text/plain; charset=utf-8 |

**Correction to the brief:** `/about` does redirect (301 to `/about/`) today, like every other page. Only `/` and `.md`/asset files are exempt.

## Configuration findings

- `astro.config.mjs`: `site: 'https://jedanderson.org'`, `output: 'static'`, `trailingSlash: 'never'`, `build.format: 'directory'`. No adapter. `@astrojs/sitemap` with a `serialize` that only stamps `lastmod`.
- `netlify.toml`: only redirects for Magnifica Vita and sitemap aliases; header rule `for = "/*.md"` sets Content-Type. No `[build.processing]` block. `public/_redirects` does not exist. `public/_headers` sets security headers only.
- `BaseLayout.astro` emits `<link rel="canonical">` and `og:url` from `Astro.url.pathname` (or the passed `canonicalUrl`), so no trailing slash. `lib/canonical.ts` builds `{site}/{collection}/{slug}`.
- `.md` twins come from `src/pages/[type]/[...slug].md.ts`, a static endpoint returning only a Content-Type header (no canonical signal).
- `dist/` has `about/index.html`, `essays/<slug>/index.html`, etc. Section indexes are `src/pages/{essays,posts,books,talks,tags}/index.astro`; `about`, `archive`, `data`, `lines` are single `.astro` files that still build to `<name>/index.html` under `format: 'directory'`.

## Diagnosis

`trailingSlash: 'never'` in Astro only governs the URLs Astro *emits* (sitemap, canonical, links) and what its dev server accepts. It does not change the files written to disk. With `build.format: 'directory'` every page is written as `<path>/index.html`. Netlify serves a directory's `index.html` at `<path>/` and, when asked for `<path>` without the slash, answers with a 301 to `<path>/`. This is Netlify's standard directory-index behaviour and applies to every page, including `/about` (which also builds to `about/index.html`); it is not the Pretty URLs `.html` rewrite, which only affects `foo.html` files and is not configured here. The result is that every canonical declared in the sitemap, `<link rel="canonical">`, and `og:url` points at a URL that 301s, while the `.md` files (plain files, no directory index) are served directly and carry no canonical signal, so Google crawls about 900 full-text duplicates.

Fix direction: build pages as `<path>.html` (`format: 'file'`), which Netlify serves at the no-slash URL with a 200 (Pretty URLs), add explicit trailing-slash to no-slash 301s, and attach a `Link: rel="canonical"` header to `.md` responses.
