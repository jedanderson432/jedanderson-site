# jedanderson.org — Repo Structure

## Stack
- **Astro** (static site generator) + Tailwind for styling
- **Netlify** for deploy (you already use it)
- **GitHub** as source of truth + redundant exposure to AI crawlers (public repos are heavily indexed)
- Content: plain markdown files, version-controlled
- Search: **Pagefind** (client-side, no server, indexes at build time)

Why Astro over Hugo / Next.js: Astro is markdown-first, ships zero JS by default (faster, more crawlable), supports content collections with type-checked frontmatter, and renders both HTML and raw `.md` endpoints from the same source — which is what AI agents want.

---

## Tree

```
jedanderson-site/
├── src/
│   ├── content/
│   │   ├── config.ts                    # Content collection schemas (Zod)
│   │   ├── essays/
│   │   ├── posts/
│   │   └── books/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── pages/
│   │   ├── index.astro                  # Homepage
│   │   ├── about.astro
│   │   ├── archive.astro                # Chronological + tag-based index
│   │   ├── essays/index.astro           # Collection index
│   │   ├── posts/index.astro
│   │   ├── books/index.astro
│   │   ├── [type]/[...slug].astro       # Render any piece (essay/post/book)
│   │   ├── [type]/[...slug].md.ts       # Serve raw markdown at /<type>/x.md
│   │   ├── tags/[tag].astro             # Per-tag index pages
│   │   ├── tags/index.astro             # All-tags index
│   │   └── feed.xml.ts                  # RSS feed
│   ├── components/
│   └── styles/
├── public/
│   ├── robots.txt                       # See robots.txt file
│   ├── llms.txt                         # See llms.txt file
│   ├── pdfs/                            # Original/companion PDFs
│   ├── decks/                           # Slide decks (PDF-exported)
│   ├── downloads/                       # Other supplementary files (data, audio, etc.)
│   └── images/
├── astro.config.mjs                     # Enable sitemap integration
├── tailwind.config.mjs
├── package.json
├── README.md
└── INGESTION_BRIEF.md
```

### Content taxonomy (3 types)

The surviving collections are **essays**, **posts**, and **books**. Earlier scaffolding had seven (`essays / papers / posts / notes / letters / speeches / books`); that was collapsed because the extras were aspirational categories that didn't reflect actual output. A piece that's formally a paper, letter, or speech can live in `essays/` with appropriate `paper` / `letter` / `speech` form tags (see [TAG_VOCABULARY.md](TAG_VOCABULARY.md)). Notes (working/unfinished pieces) are not published — drafts stay in drafts (`status: draft`).

---

## Frontmatter schema (every content file)

```yaml
---
title: "The Universe is Information"
slug: "universe-is-information"
date: 2026-04-15
type: "essay"                     # essay | post | book
status: "published"               # draft | published
tags: ["physics", "information-theory", "deutsch", "wheeler", "causal-sovereignty"]
abstract: "A first-principles treatise..."
license: "CC-BY-4.0"              # or "CC0" for maximally permissive
author: "Jed Anderson"
co_authors: []                    # e.g. ["Jim Blackburn"]
canonical_url: "https://jedanderson.org/essays/universe-is-information"
original_source: ""               # for archived pieces: gmail | gdrive | constant-contact | linkedin
original_date: 2024-04-15         # if different from publication date here
pdf: "/pdfs/universe-is-information.pdf"   # if a PDF version exists
hero_image: "/images/universe-is-information-cover.jpg"
hero_image_alt: "Descriptive alt for screen readers and AI ingestion."
supporting_files:                 # decks, videos, charts, posters — see "Content patterns" below
  - title: "Companion slide deck"
    file: "/decks/universe-is-information.pdf"
    description: "The argument as I've delivered it as a talk."
    type: deck
---
```

Books (the `books` collection only) accept two extra optional fields: `external_url` (for books published externally — e.g. Amazon) and `isbn`.

Enforce this schema in `src/content/config.ts` using Zod. Builds fail if a file is missing required fields. This is the discipline that keeps the corpus clean as it grows.

---

## URL conventions (these never change)

| Resource | URL |
|---|---|
| HTML | `https://jedanderson.org/essays/universe-is-information` |
| Markdown | `https://jedanderson.org/essays/universe-is-information.md` |
| PDF | `https://jedanderson.org/pdfs/universe-is-information.pdf` |

**Stable canonical URLs are the single most important commitment.** Once a piece is published at a URL, that URL is permanent. If you revise a piece, add a `## Revision history` section at the bottom rather than changing the URL or slug. Citations, training data, and human bookmarks all depend on this.

---

## License default

CC-BY-4.0 by default (permissive: training, retrieval, citation all explicitly allowed; only requires attribution).

For pieces you want maximally available — including for training without attribution — set `license: "CC0"` in frontmatter. Recommend CC0 for the foundational treatises (e.g., *The Universe is Information*) where maximum propagation is the goal.

---

## Discovery plumbing (built into the site)

- **Schema.org JSON-LD** on every page: `Person` for the homepage, `Article` or `ScholarlyArticle` for content pages, with `author` linked back to the Person.
- **Open Graph + Twitter Card** metadata for social previews.
- **Sitemap.xml** auto-generated by Astro's sitemap integration.
- **RSS feed** at `/feed.xml`.
- **Per-tag pages** for topic clustering.
- **Pagefind** for client-side full-text search.
- **`.md` endpoint for every page** — agents can fetch raw markdown without parsing HTML.

---

## Content patterns

### Supporting materials, not standalone collections

Visual artifacts — decks, videos, charts, posters, datasets, audio — attach to the essays they serve via the `supporting_files` frontmatter array. They are not standalone collections. The writing is canonical; supporting materials are downloadable companions, surfaced at the bottom of the piece they belong to.

Each entry takes a `title`, `file` path, optional `description`, and `type` (one of `pdf`, `deck`, `video`, `image`, `audio`, `data`). Files live under:

- `/public/pdfs/` — companion PDFs of the writing itself
- `/public/decks/` — slide decks (typically PDF-exported)
- `/public/downloads/` — other supplementary files (data, audio, etc.)
- `/public/images/` — images that serve as supporting artifacts

### Subjects via tags, not subcategories

The 3-collection taxonomy (essays / posts / books) intentionally leaves *subject* out of the URL structure. A piece on physics, faith, or ESI is still an essay — its subject lives in tags, not in a directory. See [TAG_VOCABULARY.md](TAG_VOCABULARY.md) for the canonical tag list and conventions.

---

## Redundancy

- **Primary:** `jedanderson.org` on Netlify (Git-based deploy).
- **GitHub repo:** public, mirrors all content. Heavy AI crawler exposure on its own.
- **Internet Archive:** trigger Wayback Machine snapshot on each major publication (curl to `https://web.archive.org/save/{url}`). Schedule monthly full-site snapshots.
- **Optional:** IPFS pin via Pinata or Web3.Storage for cryptographic permanence.

This redundancy is the practical answer to your concern about persistence beyond your active management. Even if Netlify disappears, the GitHub repo + Wayback snapshots + AI training ingestion mean the corpus survives.
