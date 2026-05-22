# Corpus Ingestion Prompt

Canonical, reusable prompt for ingesting new material into jedanderson.org
from corpus-inbox. Triggered by Jed saying "ingest the latest batch of
files to corpus-inbox" or any clear variant.

## Pipeline

INGESTION RUN — full pipeline, single prompt.

Read CLAUDE.md and docs/INGESTION_TRIAGE.md (if present) for project conventions.
Read docs/TAG_VOCABULARY.md for the current tag set.
Read src/content/config.ts for the frontmatter schema.

### INPUT

Source files are in C:\Users\jedan\Documents\corpus-inbox\ (top level only,
not the archive subfolder). Process every PDF, DOCX, and MD file present.
Ignore desktop.ini and any other Windows system files.

### PIPELINE — execute all phases in order, no stopping for confirmation.

**Phase 1 — Inventory and dedup**
- List every source file with size, modified date, and detected title
  (from the document, not the filename)
- For each source, extract the first 500 chars of body text
- Compare against every existing piece in src/content/essays/, posts/,
  books/, letters/, papers/, notes/, speeches/ using 70% similarity
  threshold on first 500 chars
- Classify each source as: NEW, DUPLICATE (>=70% match to existing),
  or AMBIGUOUS (50-70% match — ingest anyway, flag in report)
- Archive DUPLICATEs without ingestion

**Phase 2 — Triage and slug assignment**
- For each NEW or AMBIGUOUS source:
  - Determine type: essay (default for long-form), post (short), letter
    (addressed), speech (prepared remarks), paper (formal with references),
    note (fragmentary), book (book-length)
  - Generate kebab-case slug from the actual document title, not the filename
  - Check slug against ALL existing slugs across ALL collections — if
    collision, append a disambiguator drawn from the title (not a number)
  - Detect document type signals: if PDF is primarily slides/visuals,
    mark as deck-class and set pdf_canonical: true

**Phase 3 — Content extraction**
- For deck-class PDFs: render page 1 at 300 DPI with PyMuPDF to
  public/images/{slug}-hero.jpg. Set hero_image and hero_image_alt
  in frontmatter. Body content can be a brief description plus a link
  to the embedded PDF.
- For prose PDFs and DOCX: extract clean markdown body. Strip headers,
  footers, page numbers. Preserve em-dashes as unspaced (word—word).
  Preserve smart quotes. Preserve section structure with ## H2 headers.
- For all sources: also place the source PDF at public/pdfs/{slug}.pdf
  and reference it in frontmatter via pdf: "/pdfs/{slug}.pdf"
- **Universal PDF availability.** Every ingested piece must have a
  PDF at public/pdfs/{slug}.pdf, regardless of source format. For
  PDF sources, copy the source. For HTML sources (visual essays),
  render the original HTML to PDF via headless Chrome (Playwright's
  page.pdf() against a local server of the file). For Markdown/DOCX
  sources, render the built site page to PDF the same way (US Letter,
  ~0.6 inch margins, print backgrounds on). The
  scripts/generate-pdfs.mjs harness is the canonical implementation.

**Phase 4 — Frontmatter generation**

For each ingested piece, generate frontmatter matching the schema in
src/content/config.ts. Required:
- title (full document title, periods and punctuation preserved)
- slug (kebab-case, validated)
- date: today's date
- original_date: document's creation date if it differs from today
- type
- status: published
- tags: 3-7 tags drawn from docs/TAG_VOCABULARY.md — do NOT invent new
  tags unless the document is clearly on a new subject; if you must
  invent, list the new tag at the top of the final report and flag
  it for vocabulary doc update
- abstract: 1-2 sentences capturing the actual argument, not generic
- license: CC-BY-4.0
- pdf: "/pdfs/{slug}.pdf" — **required for every published piece**,
  regardless of source format. If the source was HTML or Markdown,
  generate the PDF per Phase 3 (headless Chrome render of the visual
  HTML or the built content page) and still set this field. The only
  exception is drafts (status: draft), which need not have a PDF.
- hero_image and hero_image_alt for deck-class
- pdf_canonical: true for deck-class

DO NOT add a tag that duplicates the content type (no "letter" tag on
items in letters/, no "essay" tag on items in essays/).

**Phase 5 — Schema/collection changes (only if needed)**

If any ingested piece is a type not currently wired up in src/content/config.ts:
- Add the type to CONTENT_TYPES
- Add the collection to the export with baseSchema
- Add type→collection mapping in src/site-config.ts (TYPE_TO_COLLECTION,
  COLLECTION_TO_TYPE, COLLECTIONS, NAV_COLLECTIONS, TYPE_LABELS)
- Create the empty directory under src/content/

**Phase 6 — Build and validate**
- Run `npm run build` locally
- Confirm slug validator passes
- Confirm page count increased by the expected amount
- Confirm no build errors
- If build fails, fix and rerun

**Phase 7 — Archive sources**

Move all processed source files (NEW, DUPLICATE, AMBIGUOUS) from
corpus-inbox/ top level into corpus-inbox/archive/{today-YYYY-MM-DD}/.
Leave desktop.ini in place. Confirm top level is empty after.

**Phase 8 — Commit and deploy**
- Stage all changes
- Commit with message: "Ingest and publish {N}-piece batch from {date}"
- Push to origin/main
- Wait for Netlify deploy to complete
- Confirm deploy is live (check etag changes)

**Phase 9 — Report**

Output a final report with:
- Total processed, broken down by NEW / DUPLICATE / AMBIGUOUS
- Final ingestion count published live
- Table of every published piece: slug, type, title, tags
- Any AMBIGUOUS items with conceptual-overlap notes for human review
- Any new tags introduced (so I can decide whether to keep them and
  add to TAG_VOCABULARY.md)
- Any schema/collection changes made
- Commit hash, page count delta, Netlify deploy status
- Spot-check live URLs for 3 random published pieces
- Inbox state (should be empty top level)

DO NOT pause for confirmation between phases. If you hit a blocker
that requires a human decision (e.g., a source PDF is unreadable, a
title is ambiguous beyond resolution, the build fails in a way you
can't fix), stop and report — but only then. Default to forward motion.
