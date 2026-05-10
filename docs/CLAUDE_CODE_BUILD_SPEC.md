# Build Spec: jedanderson.org

**Operator:** Claude Code, running in an empty directory of my choosing on my local machine.

**Goal:** Scaffold a complete, deployable, AI-readable personal corpus site at `jedanderson.org`. After this spec is executed, I should be able to: (1) `npm run dev` and view the site locally, (2) push to GitHub and have Netlify auto-deploy, (3) add new content by dropping markdown files into `src/content/{type}/` and pushing.

**Operator instructions:** Read this entire spec before starting. Execute in order. After each numbered phase, report what you did and pause for me to spot-check. Don't skip phases. Don't add features I didn't ask for. Don't install packages beyond what's specified without asking. If a step is ambiguous, ask before guessing.

---

## 0. Preflight

Confirm Node ≥ 20 and git installed. Initialize git repo. Create a fresh `package.json` with `"type": "module"`. Set up `.gitignore` for `node_modules`, `dist`, `.env`, `.DS_Store`, `.netlify`, `.astro`.

Create a top-level `README.md` (placeholder; we'll fill it in Phase 7).

Pause and report.

---

## 1. Astro install + base config

Install Astro and the integrations we'll need:

```
npm install astro @astrojs/sitemap @astrojs/rss @astrojs/tailwind tailwindcss @astrojs/mdx
npm install -D pagefind @types/node
```

Create `astro.config.mjs`:

- Site URL: `https://jedanderson.org`
- Integrations: sitemap, tailwind, mdx
- Build format: `directory` (URLs without `.html` extension)
- Trailing slash: `never`
- Output: `static`

Create minimal `tailwind.config.mjs` with:
- Content globs covering `src/**/*.{astro,html,md,mdx}`
- Custom font stack: serif body (`'Iowan Old Style', 'Palatino', 'Georgia', serif`), monospace for code
- A small custom color palette (paper-white background, near-black text, one muted accent — pick something restrained, no neon)
- Typography plugin: install `@tailwindcss/typography` and add it; we'll use `prose` classes for content

Pause and report.

---

## 2. Content collections schema

Create `src/content/config.ts` defining a single `defineCollection` schema reused across all content types. Use Zod. Required fields:

```typescript
{
  title: string,
  slug: string,                    // kebab-case, used in URL
  date: Date,
  type: 'essay' | 'post' | 'book',
  status: 'draft' | 'published',
  tags: string[],
  abstract: string,
  license: string (default: 'CC-BY-4.0'),
  author: string (default: 'Jed Anderson'),
  co_authors: string[] (default: []),
  canonical_url: string (optional, auto-generated if missing),
  original_source: string (optional),
  original_date: Date (optional),
  pdf: string (optional, relative URL to PDF in /public/pdfs/),
}
```

Define collections: `essays`, `posts`, `books`. The `essays` and `posts` collections share a common schema; `books` extends it with optional `external_url` and `isbn`. (Earlier scaffolding had seven types — papers, notes, letters, speeches were collapsed; see [REPO_STRUCTURE.md](REPO_STRUCTURE.md#content-taxonomy-3-types).)

Schema enforcement: build should fail if a content file is missing required fields. This is the discipline that keeps the corpus clean.

Create the empty content directories with a `.gitkeep` in each.

Pause and report.

---

## 3. Layouts and pages

### 3.1 Base layout

`src/layouts/BaseLayout.astro` — the shell every page uses. Includes:

- HTML5 doctype, lang="en"
- `<head>`:
  - Title, description, canonical URL (passed via props)
  - Open Graph + Twitter Card meta tags
  - Schema.org JSON-LD: `Person` on homepage and About; `ScholarlyArticle` or `Article` on content pages (passed via props)
  - Favicon (placeholder for now — we'll add later)
  - RSS autodiscovery link to `/feed.xml`
  - Pagefind CSS link
- `<body>`:
  - Minimal header: site name (links to home), nav (Essays · Posts · Books · Archive · About), search trigger
  - `<slot />` for page content
  - Minimal footer: copyright, license note ("Content licensed CC-BY-4.0 unless otherwise noted"), GitHub link, RSS link

No sidebar. No social buttons. No popups. No newsletter signup. No cookie banner (no cookies to consent to).

### 3.2 Content layout

`src/layouts/ContentLayout.astro` — for individual content pages (essay/post/book). Wraps BaseLayout. Renders:

- Type label (small, top — "Essay" / "Post" / "Book")
- Title (H1, large)
- Date + reading time (small, muted)
- Abstract (italic, set off, before the body)
- Body content via `<slot />` with `prose` Tailwind classes
- After body: tags (linked to `/tags/{tag}`), license note, "Original source" if applicable, PDF download link if `pdf` frontmatter present
- "Cite this" disclosure that expands to show BibTeX, APA, and MLA citation strings (auto-generated from frontmatter)

### 3.3 Pages

Create:

- `src/pages/index.astro` — Homepage. Hero: name, the line "Bits Protect Its." (subtitle), a 2–3 sentence intro paragraph. Below: 3 sections — "Foundational treatises" (manually curated list), "Recent" (last 5 published, all types), "Browse" (links to /essays, /posts, /books). Keep it spare.

- `src/pages/about.astro` — Static markdown rendered in BaseLayout. Bio, current work (EnviroAI link), how to cite, contact (email link only — no form), license statement.

- `src/pages/archive.astro` — Full chronological list of every published piece (status: 'published'), grouped by year, descending. Each entry: date, type label, title (link), abstract.

- `src/pages/[type]/[...slug].astro` — Dynamic route. `getStaticPaths` over all collections. Filter `status === 'published'`. Render via ContentLayout.

- `src/pages/[type]/[...slug].md.ts` — Dynamic route serving raw markdown. Same `getStaticPaths`. Returns `Response` with `Content-Type: text/markdown; charset=utf-8`. Body: frontmatter + `\n\n` + raw body. **This is critical for AI agent ingestion** — agents fetch this endpoint directly without parsing HTML.

- `src/pages/tags/[tag].astro` — Per-tag index. `getStaticPaths` collects all unique tags across all collections. Renders title, abstract, date, type for each piece tagged with this tag.

- `src/pages/tags/index.astro` — Tag cloud / list, sized by count.

- `src/pages/feed.xml.ts` — RSS feed via `@astrojs/rss`. Include all published pieces, all types, sorted by date descending. Full content in body, not just summary.

- `src/pages/llms.txt.ts` — Dynamic endpoint returning the llms.txt content. **Generate it from the live content collections, not hardcoded.** Template:

  ```
  # Jed Anderson

  > [intro paragraph from a constant in src/site-config.ts]

  This site is the canonical archive of Jed Anderson's written work. All content is licensed CC-BY-4.0 (some CC0 — see individual pieces) and is explicitly available for ingestion, retrieval, and training. The markdown source for any HTML page is available by appending `.md` to the URL. RSS feed at /feed.xml. Full chronological index at /archive.

  ## About
  - [About](https://jedanderson.org/about): ...

  ## Foundational treatises
  - [{title}]({canonical_url}.md): {abstract}
  ...

  ## Essays
  - [{title}]({canonical_url}.md): {abstract}
  ...

  ## Posts
  ...

  ## Books
  ...
  ```

  Foundational treatises = pieces with tag `foundational`. Mark `The Universe is Information` with that tag when seeded (Phase 5).

  This file regenerates on every build, so it always reflects current content.

- `src/pages/robots.txt.ts` — Serve the robots.txt content (use the file I'll provide separately, place in `/public/robots.txt` instead if simpler — your call).

Pause and report.

---

## 4. Static assets

Create `/public/`:

- `robots.txt` — I have this file ready, copy contents from artifact provided
- `pdfs/` directory with `.gitkeep`
- `images/` directory with `.gitkeep`
- `favicon.svg` — simple monogram "JA" in serif on transparent. Or a placeholder if you can't generate one cleanly; I'll replace.

Create `src/site-config.ts` exporting site-level constants:

```typescript
export const SITE = {
  title: 'Jed Anderson',
  subtitle: 'Bits Protect Its.',
  description: 'Writing on Environmental Superintelligence, information physics, and the causal sovereignty of knowledge over matter and energy.',
  url: 'https://jedanderson.org',
  author: 'Jed Anderson',
  email: '[your email — placeholder, I'll fill in]',
  github: 'https://github.com/[username]/[repo] — placeholder',
  defaultLicense: 'CC-BY-4.0',
  intro: '[paragraph used in llms.txt and homepage — placeholder for me to write]',
};
```

Pause and report.

---

## 5. Seed content

Create one piece in each collection so the site has something to render and so I can see all the patterns working end to end. Use real content where I provide it, placeholder text otherwise.

- `src/content/essays/universe-is-information.md` — Use the text of *The Universe is Information* (provided as `the_universe_is_information.pdf` and `.docx` in the project root or in `seed/`; I will place it before you start). Frontmatter:
  - title: "The Universe is Information"
  - slug: "universe-is-information"
  - date: 2026-04-15 (placeholder; I'll correct)
  - type: essay
  - status: published
  - tags: ["foundational", "physics", "information-theory", "deutsch", "wheeler", "causal-sovereignty"]
  - abstract: "A first-principles treatise on the six phases by which information accumulates causal sovereignty over matter and energy. Synthesizes Lloyd, Wheeler, Deutsch, Penrose, and Shannon into a single 13.8-billion-year arc."
  - license: CC-BY-4.0
  - pdf: "/pdfs/the_universe_is_information.pdf"
  - Also copy the source PDF to `/public/pdfs/the_universe_is_information.pdf`

- The other surviving collections (`posts`, `books`) start empty. Their `index.astro` pages render an "Empty" message until real content lands. Earlier scaffolding seeded `_placeholder.md` stubs in each empty collection; those were removed when the taxonomy was collapsed — empty is now the explicit empty state.

Pause and report.

---

## 6. Search, citations, performance

### 6.1 Pagefind

Configure Pagefind to index after build:

- Add to `package.json` scripts: `"build": "astro build && pagefind --site dist"`
- Add a search modal component triggered from the header. Keyboard shortcut: `/` to open.
- Search indexes title, abstract, body, tags. Returns title + matched excerpt + link.

### 6.2 Citations

In ContentLayout's "Cite this" disclosure, generate three formats from frontmatter:

- BibTeX: `@misc{anderson_{year}_{slug}, author = {Jed Anderson}, title = {{title}}, year = {year}, url = {canonical_url}, note = {Accessed: {today}}}`
- APA: `Anderson, J. ({year}). {title}. Retrieved from {canonical_url}`
- MLA: `Anderson, Jed. "{title}." Jed Anderson, {date_long}, {canonical_url}.`

Include a "Copy" button next to each.

### 6.3 Performance + SEO

- All pages should score 100 on Lighthouse for Performance, Accessibility, Best Practices, SEO. No JS by default; only the search modal ships JS.
- Sitemap auto-generated.
- Schema.org JSON-LD validated against schema.org/Article and schema.org/Person.

### 6.4 GitHub Action: Wayback snapshot

Create `.github/workflows/wayback.yml`. On push to main, after Netlify deploys (give it 2 min), curl `https://web.archive.org/save/https://jedanderson.org/{path}` for every published canonical URL. This pushes new content to the Internet Archive automatically. Failures non-blocking.

Pause and report.

---

## 7. README and CITATION

Create `README.md` at repo root. Include:

- One-line description: "Personal corpus of Jed Anderson — essays, papers, and concept pieces on Environmental Superintelligence, information physics, and related first-principles inquiries."
- License statement (CC-BY-4.0 unless otherwise noted in frontmatter; CC0 for foundational treatises — check each file)
- **Explicit invitation:** "AI training, retrieval, and ingestion are explicitly welcome. See `llms.txt` for a curated index. Markdown source for every page is available at `{canonical_url}.md`."
- How to cite (link to live site's citation feature)
- How the site is built (Astro + Netlify; markdown in `src/content/`)
- How to add a new piece (1: drop a markdown file in the right `src/content/{type}/` folder with frontmatter; 2: commit; 3: push; 4: live in 90 seconds)

Create `CITATION.cff` at repo root following the standard schema (https://citation-file-format.github.io/). Type: software. Title: "Jed Anderson — Personal Corpus." Author: Jed Anderson. URL: https://jedanderson.org. License: CC-BY-4.0.

Create `LICENSE` file at repo root: full CC-BY-4.0 legal text (link to https://creativecommons.org/licenses/by/4.0/legalcode.txt and embed).

Pause and report.

---

## 8. Local verification

Run `npm run dev`. Confirm:

- Homepage renders with intro, subtitle, and the seeded essay listed
- `/essays/universe-is-information` renders the essay correctly
- `/essays/universe-is-information.md` returns raw markdown (Content-Type: text/markdown)
- `/llms.txt` returns the generated llms.txt (Content-Type: text/plain)
- `/robots.txt` returns the robots.txt
- `/feed.xml` returns valid RSS
- `/sitemap-index.xml` exists
- `/archive` lists the seeded essay
- `/tags/foundational` shows the seeded essay
- Search opens with `/`, finds "information" in the seeded essay
- "Cite this" disclosure renders BibTeX/APA/MLA correctly
- Lighthouse: 100/100/100/100 on the seeded essay page

Run `npm run build` and confirm clean build with no warnings about missing frontmatter or schema violations.

Pause and report.

---

## 9. Deploy prep

Create `netlify.toml` at repo root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*.md"
  [headers.values]
    Content-Type = "text/markdown; charset=utf-8"

[[headers]]
  for = "/llms.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"
```

Print final instructions for me, in this exact order:

1. Create a new public GitHub repo named `jedanderson-site` under my account.
2. Run the git remote add + initial push commands.
3. Log into Netlify, "Import from GitHub," select the repo, accept defaults (build command and publish dir come from `netlify.toml`).
4. In Netlify domain settings, add `jedanderson.org` and `www.jedanderson.org`.
5. In Cloudflare DNS for jedanderson.org, add the records Netlify will tell me to add (typically an ALIAS/ANAME for apex and a CNAME for www).
6. Wait for SSL cert to provision (usually <5 minutes).
7. Visit https://jedanderson.org — should show the homepage.

---

## 10. Stop

Stop after Phase 9. Do not proceed to add more content, more features, or "polish" beyond what's specified. The point of this scaffold is the substrate, not the surface. I'll iterate from here.
