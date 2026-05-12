# Working with the jedanderson-site repo

This file establishes durable conventions for Claude Code sessions on this repo. Read it at the start of every session.

## Project overview

jedanderson.org is a personal corpus site for Jed Anderson's writing on environmental superintelligence, information physics, and faith-integrated first-principles thinking. The site is intentionally AI-readable and optimized for 25-year findability. Architecture details in docs/REPO_STRUCTURE.md.

Core thesis: "Bits Protect Its." Information accumulates causal sovereignty over matter and energy.

## Corpus ingestion workflow

The local staging folder for new material is:
  C:\Users\jedan\Documents\corpus-inbox\

When the user says "process my inbox," "ingest the new material," "run an ingestion pass," or similar:

1. Treat corpus-inbox/ as the source. Process every top-level item in it.
2. Run the standard workflow: inventory → dedup against already-published material → triage manifest → wait for user confirmation → ingest confirmed items as drafts → archive source files to corpus-inbox/archive/{date}/ → build, commit, push.
3. Files in src/content/{essays,posts,books}/ are the dedup reference. A new PDF whose title or filename matches an already-published slug = DUPLICATE.
4. Em-dashes unspaced everywhere (word—word, never word — word). This is a project-wide convention.
5. Always set status: draft on newly ingested items. The user reviews and flips to published manually.
6. Each ingestion batch gets its own dated triage manifest: docs/INGESTION_TRIAGE_{YYYY-MM-DD}.md
7. After processing, corpus-inbox/ top level should be empty; processed items live in corpus-inbox/archive/{date}/.

The local backup folder for already-processed material is:
  C:\Users\jedan\Documents\corpus-archive\

Do not touch corpus-archive/. It is read-only safekeeping. Never ingest from it.

## Repo conventions

- Slug validation: kebab-case only, matching ^[a-z0-9]+(?:-[a-z0-9]+)*$. Build fails on invalid slugs.
- Frontmatter template: docs/essay-frontmatter-template.md
- Tag vocabulary: docs/TAG_VOCABULARY.md. Reuse existing tags before inventing new ones. When introducing a new tag, add it to the vocabulary file with a one-line definition.
- Stable canonical URLs: once a piece is published at a URL, that URL is permanent. Revisions add a "Revision history" section to the bottom of the piece, never change the URL or slug.

## Content type placement

- Prose essays: src/content/essays/{slug}.md
- Posts (short-form): src/content/posts/{slug}.md
- Books: src/content/books/{slug}.md
- Papers, notes, letters, speeches: respective src/content/{type}/ folders
- Visual essays: live in src/content/essays/ with the visual-essay tag. Not a separate collection.
- PDF artifacts: public/pdfs/{slug}.pdf
- HTML interactive artifacts: public/visual-essays/{slug}/ (a directory containing index.html and assets)
- Hero images: public/images/{slug}-hero.jpg or .png

## Visual essay frontmatter

Visual essays use these optional frontmatter fields:
- pdf: "/pdfs/{slug}.pdf" for PDF deck artifacts
- interactive_url: "/visual-essays/{slug}/" for HTML interactive artifacts
- interactive_cta: "Begin the {whatever} →" custom CTA button text

The ContentLayout renders appropriate launch/download UI based on which fields are set.

## Build and deploy

- After file changes: npm run build, fix any errors, commit with descriptive message, push to main
- Netlify auto-deploys main branch; ~90 second deploy time
- A slug validator runs first at build time; fails the build on any invalid slug
- Drafts (status: draft) do NOT appear on the public site but DO get committed to the repo

## Operational defaults

- One writer per repo at a time. Do not parallelize work on this repo across simultaneous Claude Code sessions.
- Always run npm run build locally before committing significant changes.
- Verify Netlify deploy succeeded before reporting a task complete.
- Provide a clear final report after any multi-step task: what was done, commit hash, deploy status, anything flagged for user review.
