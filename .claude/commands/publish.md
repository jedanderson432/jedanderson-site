---
description: Publish material to jedanderson.org from corpus-inbox or pasted markdown
---

Publish the material I'm pointing you at to jedanderson.org. Source may be markdown pasted below, or one or more files in `C:\Users\jedan\Documents\corpus-inbox` (PDF, PNG, JPG, HTML, .eml, .docx, .txt, .md — handle whatever's there).

Steps:

1. Read `docs/essay-frontmatter-template.md`, `docs/TAG_VOCABULARY.md`, `docs/INGESTION_PROMPT.md`, and a sample of existing pieces in `src/content/` to ground in conventions. Do this before writing anything.

2. **Source detection.** If markdown is pasted below the `--- CONTENT BELOW ---` line, use that. Otherwise process whatever's in corpus-inbox at the top level only — ignore anything inside `_hold/` or any other subfolder. If both, do both.

3. **Conversion by source type.** For each input:
   - **PDF**: Extract text with PyMuPDF. Preserve section headers as `## H2`. Preserve blockquotes, lists, italics, bold where detectable. Render the first page as a hero image at `public/images/{slug}-cover.jpg`, 1200px wide, JPEG quality 85. Copy the source PDF to `public/pdfs/{slug}.pdf` and reference it in frontmatter as `pdf: "/pdfs/{slug}.pdf"`.
   - **HTML / .eml**: Strip with `beautifulsoup4`, convert to markdown with `markdownify`. Apply the three fixes from the prior CC ingestion bug: decode HTML entities in titles (`&#8217;` → `'`, etc.), flatten layout tables to prose rather than pipe-table syntax, and resolve image `src` references — download embedded/linked images to `public/images/{slug}-{n}.jpg` and rewrite markdown image references to those local paths. If an image can't be fetched, log it and continue.
   - **PNG / JPG (standalone, not embedded in another doc)**: Treat as a visual artifact. It attaches to an essay rather than standing alone. Stop and ask which essay it belongs to before proceeding — this is the one exception to the no-checkpoint rule, because misattributing a visual is harder to undo than misrouting text.
   - **DOCX**: Convert with `mammoth`. Preserve headers, lists, blockquotes, emphasis. Extract embedded images to `public/images/{slug}-{n}.jpg`.
   - **TXT / MD**: Use directly. Normalize whitespace.

4. **Body normalization (all sources):**
   - Unspaced em-dashes (word—word), never spaced
   - Smart quotes preserved as " " ' '
   - Section headers `## H2` with optional Roman numeral prefix if the source uses them
   - Pure markdown — no inline HTML, no `<div>`, no `<span>`
   - Em-dashes preserved as `—` not `--`
   - Strip any boilerplate (email signatures, "view in browser" links, unsubscribe footers, paginated PDF page numbers, headers/footers repeated on every page)

5. **Type inference.** essay | paper | post | note | letter | speech | book. PDFs over ~2000 words default to `essay`, formal pieces with abstracts and references to `paper`, short conversational pieces to `post`, CC emails to `post`, addressed pieces to `letter`. Decide and proceed.

6. **Slug inference.** From title. Lowercase, hyphens, no stop-word prefixes ("the-", "a-", "an-") unless the title is unrecognizable without them. Must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Check for collisions with existing slugs; if collision, append year (`-2023`) or disambiguating word.

7. **Frontmatter:**
   - `title`: verbatim from source
   - `slug`: from step 6
   - `date`: today's date for new pieces. For CC emails or other historical material with a clear original send date, set `date: {original_date}` and also `original_date: {original_date}`.
   - `type`: from step 5
   - `status: published`
   - `tags`: 3-7, reused from `docs/TAG_VOCABULARY.md` before inventing. If a new tag is genuinely needed, add it to `docs/TAG_VOCABULARY.md` in the same commit and flag in the summary.
   - `abstract`: 1-2 sentences, specific to this piece's actual argument
   - `subtitle`: only if the source has one
   - `pdf`: if PDF source
   - `hero_image`: if PDF source (cover rendering) or DOCX/HTML with usable embedded image
   - `license: CC-BY-4.0`

8. Write file(s) at `src/content/{type}/{slug}.md`.

9. Run `npm run build` locally. If it fails, fix and re-run until clean.

10. Move processed source files from `corpus-inbox` to `corpus-archive`, preserving filenames. Never touch anything in `corpus-inbox/_hold/`.

11. Commit with message `publish: {title}` (or `publish: batch of {n} pieces` if multiple). Push to main. Netlify auto-deploys.

12. After deploy, report: file paths written, canonical URLs, hero images created, any tags added to vocabulary, any images that failed to fetch, any standalone PNG/JPG files awaiting essay assignment.

Execute end to end without checkpoints, except step 3's standalone-image case.

--- CONTENT BELOW (optional — leave blank if processing corpus-inbox) ---
