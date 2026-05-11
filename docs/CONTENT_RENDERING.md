# Content rendering

How a piece of writing appears on the site is governed by two **independent** dimensions:

1. **Selection tier** — *which indexes feature the piece* — is driven by tags.
2. **Render mode** — *how the article page itself is laid out* — is driven by frontmatter fields.

The two often coincide for cornerstone work, but they don't have to. A piece can carry the `cornerstone` tag (selection) while still rendering as a plain essay (no hero image, no PDF, no TOC). A standard-tier post can render with a hero image. Treat the two as orthogonal knobs.

This document is the contract between the content collections and the templates that render them. Update it whenever you add a new mode, a new selector, or a new frontmatter field that changes rendering.

---

## Selection tiers

Selection tier controls **which homepage and index sections** a piece appears in. Driven entirely by the `tags` array in frontmatter.

### Cornerstone

- **Tag:** `cornerstone`
- **Appears in:** Homepage "Start here" section — large editorial cards, 200×270 cover thumbnails, full abstract below the title.
- **Intent:** The 3–5 pieces that constitute the load-bearing arguments of the corpus. Reserved for foundational work that everything else references back to.
- **Current members:** `the-universe-is-information`, `first-defender`, `intelligence-leverage-equation`.

### Foundational

- **Tag:** `foundational` (but **not** `cornerstone`)
- **Appears in:** Homepage "Foundational treatises" section — two-column grid, 140px cover thumbnails, line-clamped abstract.
- **Intent:** Substantial conceptual pieces that aren't part of the top tier but are referenced by the cornerstone work and stand on their own.
- **Exclusion rule:** The homepage filter explicitly removes pieces that also carry `cornerstone`, so a cornerstone piece does not appear twice.

### Standard

- **Tag:** *(absence of `cornerstone` and `foundational`)*
- **Appears in:** Collection indexes (`/essays`, `/posts`, `/books`), homepage "Recent" section (most recent 6 across all collections), tag pages, archive.
- **Intent:** The default. Most writing lives here.

> Tier assignment is a deliberate editorial decision. Don't promote routinely — the cornerstone and foundational sections lose meaning if they fill up.

---

## Render modes

Render mode controls **how the article page itself is laid out** (`src/layouts/ContentLayout.astro`). The mode emerges from a small set of frontmatter fields. There is no `mode:` field — it's inferred.

### Mode A: PDF-canonical cover card

The article page foregrounds the PDF as the canonical artifact. The hero image is the clickable cover that opens the PDF in a new tab, flanked by three small affordances for AI / source / inspection use.

**Triggered by:** `pdf` set, `pdf_canonical: true`, and `hero_image` set.

**Renders:**
- Title block (type label, title, subtitle, date, abstract if shown).
- Centered cover image, max-width 800px, click-through to the PDF, subtle hover shadow + scale.
- Affordance row below the cover: *Read PDF · N pages*, *Raw markdown*, *View on GitHub*.
- Horizontal rule.
- In-page TOC (if `show_toc: true`).
- Markdown body.
- License/source/markdown/github footer block.

**Used for:** Long-form essays whose canonical form is the PDF (typography, equations, layout matter). The markdown body still exists as an accessible / AI-readable mirror — that's the point of the affordance row.

**Examples:** `first-defender`, `the-universe-is-information`, `intelligence-leverage-equation`.

### Mode B: Hero-image essay

Inline hero image at the top of the article. The markdown body is canonical; the image is a visual lead-in.

**Triggered by:** `hero_image` set, `pdf_canonical` falsy (unset or `false`).

**Renders:**
- Full-width hero image at the top of the article, 4px corner radius, eager-loaded.
- Title block.
- In-page TOC (if `show_toc: true`).
- Markdown body.
- License/source/markdown/github footer block.

**Used for:** Essays where the lead image carries weight but the writing is the primary artifact.

### Mode C: Plain essay

No image, no PDF artifact — just typography.

**Triggered by:** No `hero_image`, no `pdf_canonical`.

**Renders:**
- Title block.
- In-page TOC (if `show_toc: true`).
- Markdown body.
- License/source/markdown/github footer block.

**Used for:** Posts and shorter essays. The site's default mode.

---

## Cross-cutting frontmatter flags

These affect rendering across all modes. Documented separately because they're orthogonal to mode selection.

### `show_abstract_on_page`

- **Type:** `boolean` (optional)
- **Default behavior:** The abstract renders on the page when `status !== 'published'` (drafts) **OR** when `show_abstract_on_page: true` is set explicitly. Published pieces omit the on-page abstract by default — the abstract still feeds OG/Twitter/JSON-LD metadata, but doesn't appear in the body. The reasoning: most published essays open with their own lead, and a duplicate abstract above creates redundancy.
- **When to set true:** Foundational pieces where the abstract is a load-bearing summary the reader should see before committing to the body. Pieces whose opening doesn't itself summarize the argument.
- **Render location:** Italic, muted, left-rule bar, above the body and below the date.

### `show_toc`

- **Type:** `boolean` (optional)
- **Triggered:** When true *and* the body contains at least one H2.
- **Renders:** Two-column numbered list of H2 headings, between the title block (and abstract, if shown) and the markdown body. Anchored to heading slugs.
- **When to set:** Long essays with 4+ sections. Skip for short essays — the TOC adds chrome without payoff.

### `related_essay`

- **Type:** `string` (optional). Format: `/{collection}/{slug}`.
- **Renders:** One-line "Related: {title}" link below the body, above any supporting_files. Title is resolved by collection lookup; falls back to the raw path if the entry isn't found.
- **Bidirectionality:** The `related_essay` field renders the link in one direction only. For two-way links (cornerstone ↔ foundational bridge pieces), add a `*Related: [Title](/path)—context.*` line at the end of the other piece's markdown body. The field handles one direction, the prose line handles the reverse.

### `pdf` (without `pdf_canonical`)

- **Type:** `string` (optional)
- **Renders:** A "Download PDF" line in the footer block. No cover card, no affordance row. Useful when a PDF exists as a *companion* artifact rather than the canonical form.

### `pdf_pages`

- **Type:** `positive integer` (optional)
- **Renders:** Appended to the "Read PDF" affordance as " · {N} pages" in Mode A. Skip if absent.

### `hero_image_alt`

- **Type:** `string` (optional)
- **Renders:** As `alt` text on hero and cover images. Defaults to the title if absent. Set explicitly when the image content meaningfully differs from the title.

### `supporting_files`

- **Type:** array of `{title, file, type, description?}` (optional)
- **Renders:** A "Supporting materials" section below the body and related_essay, before the tag row. Each entry shows a title (linked to `file`), a type label (uppercase tracking), and an optional description.
- **Intent:** Decks, videos, charts, datasets that *attach* to a piece of writing. The writing is canonical; these are downloadable companions, never standalone collections.

---

## Decision flow

When ingesting or authoring a new piece, walk through these in order:

1. **Is this a cornerstone piece?** Add `cornerstone` and `foundational` tags. (Cornerstones are implicitly foundational; the homepage filter handles dedup.)
2. **Otherwise, is it foundational?** Add `foundational`.
3. **Otherwise, no tier tag** — it's standard.
4. **Does the PDF carry the canonical form?** Set `pdf`, `pdf_canonical: true`, `hero_image` (cover), `pdf_pages`.
5. **Is there a lead image but no PDF?** Set `hero_image` only. (Mode B.)
6. **Neither?** Mode C — nothing to do.
7. **Is the body long enough to benefit from a TOC?** Set `show_toc: true`.
8. **Does the opening lack a self-summary?** Set `show_abstract_on_page: true`.
9. **Does this piece pair with another?** Set `related_essay` here, and add a `*Related: ...*` prose line at the end of the other piece's body.

---

## Where the rules live

- **Schema validation:** `src/content/config.ts` — Zod schema. Add new fields here first.
- **Article-page rendering:** `src/layouts/ContentLayout.astro` — all three modes, all the cross-cutting flags.
- **Homepage tier selection:** `src/pages/index.astro` — `cornerstone` / `foundational` / `recent` filters.
- **Type labels:** `src/site-config.ts` — `TYPE_LABELS` maps `type` to display string.
- **Print rendering:** `src/layouts/BaseLayout.astro` — `@media print` block. Strips chrome, expands to full page width, appends external URLs.

When you add a new render mode or selector, update this document in the same commit. Drift between code and this doc is the failure case to prevent.
