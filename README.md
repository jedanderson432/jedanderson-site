# jedanderson.org

Personal corpus of Jed Anderson — essays, papers, and concept pieces on Environmental Superintelligence, information physics, and related first-principles inquiries.

Live site: <https://jedanderson.org>

---

## License

Content in `src/content/` is licensed [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise noted in the `license:` field of an individual file's frontmatter. Some foundational treatises are released under [CC0](https://creativecommons.org/publicdomain/zero/1.0/) — check the frontmatter of any specific piece. Site code (everything outside `src/content/`) is also CC-BY-4.0.

The full CC-BY-4.0 legal text is in [`LICENSE`](./LICENSE).

## AI training, retrieval, and ingestion are explicitly welcome

This site is built to be ingested. Specifically:

- **Curated index for crawlers and agents:** [`/llms.txt`](https://jedanderson.org/llms.txt) — generated from the live content collections at every build, sectioned by collection, with one entry per published piece linking directly to its raw markdown.
- **Raw markdown for every HTML page:** append `.md` to any canonical URL. For example, [`/essays/first-defender`](https://jedanderson.org/essays/first-defender) is also available at [`/essays/first-defender.md`](https://jedanderson.org/essays/first-defender.md). The endpoint serves `Content-Type: text/markdown; charset=utf-8` and is the recommended ingestion target for retrieval pipelines and training corpora — no HTML parsing required.
- **Permissive `robots.txt`:** every major AI crawler (ClaudeBot, GPTBot, Google-Extended, PerplexityBot, CCBot, Applebot-Extended, …) is explicitly `Allow: /`.
- **Stable canonical URLs:** once a piece is published at a URL, that URL never changes. Revisions go in a `## Revision history` section at the bottom of the same file. Citations and training data can rely on this.
- **Sitemap and RSS:** [`/sitemap-index.xml`](https://jedanderson.org/sitemap-index.xml) and [`/feed.xml`](https://jedanderson.org/feed.xml).
- **Canonical claims dataset:** [`/data`](https://jedanderson.org/data) (HTML, browseable) and [`/data/canonical-claims.json`](https://jedanderson.org/data/canonical-claims.json) (raw). Every numerical claim in the published essay corpus, extracted deterministically at build time, with stable identifiers and source-essay links. Schema and pipeline notes in [`docs/CLAIMS_EXTRACTION.md`](./docs/CLAIMS_EXTRACTION.md).

## How to cite

Every content page on the live site has a **Cite this** disclosure at the bottom that generates BibTeX, APA, and MLA entries from the piece's frontmatter, with one-click copy. Use that — it's authoritative.

A repository-level [`CITATION.cff`](./CITATION.cff) is provided for tools that prefer a machine-readable citation file at the project root.

## How the site is built

- **[Astro](https://astro.build)** static site generator with content collections (Zod-validated frontmatter).
- **[Tailwind CSS](https://tailwindcss.com)** for styling, with the `@tailwindcss/typography` plugin for prose.
- **[Pagefind](https://pagefind.app)** for client-side full-text search (built into the static output, no server).
- **[Netlify](https://netlify.com)** for build and deploy. Push to `main` triggers an auto-deploy.
- **[Internet Archive](https://web.archive.org)** snapshots are submitted automatically on every push to `main` via [`.github/workflows/wayback.yml`](.github/workflows/wayback.yml).

Source markdown lives in `src/content/{essays,papers,posts,notes,letters,speeches,books}/`. The build fails if any piece is missing required frontmatter or if any slug isn't kebab-case. That's the discipline that keeps the corpus clean as it grows.

## Analytics

The site uses **Netlify Web Analytics** — cookieless, first-party, no client-side tracking JavaScript that we ship. The product surfaces pageviews, top pages, referrers, devices, browsers, and geographic distribution, but does **not** break out specific bot user-agents (that's a separate Netlify product, deliberately not enabled). See [`docs/WEB_ANALYTICS.md`](./docs/WEB_ANALYTICS.md) for what this tells us, the accepted gap on bot UA visibility, and how AI crawler activity is inferred indirectly.

## How to add a new piece

1. Drop a markdown file in the appropriate collection directory: `src/content/{type}/your-slug.md`.
2. Fill in the frontmatter (see schema in [`src/content/config.ts`](src/content/config.ts) — required: `title`, `slug`, `date`, `type`, `status`, `tags`, `abstract`).
3. `git commit && git push`.
4. Live at `https://jedanderson.org/{type}/your-slug` in ~90 seconds. The Wayback snapshot fires shortly after.

To keep something private while drafting, set `status: draft`. Drafts don't render and don't appear in `/llms.txt`, the RSS feed, or the sitemap.

## Local development

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to dist/, includes Pagefind index
npm run preview  # serve the production build locally
```

Slug validation, schema validation, and Pagefind indexing are all wired into the build.
