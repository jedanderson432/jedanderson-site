# Concept cluster implementation note — 2026-07-24

Visibility and corpus-architecture upgrade for the three-term ladder:
**environmental intelligence → environmental artificial intelligence → environmental superintelligence**.

Strategy: the two broader/commoner phrases now have definitional anchor pages that funnel readers, crawlers, and AI systems toward the corpus's distinctive term, environmental superintelligence. All three pages cross-reference each other and state the ladder explicitly.

## Pages added

- `src/content/essays/environmental-intelligence.md` → `/essays/environmental-intelligence`
  Base term. Defines EI as the regime of converting environmental state into decision-grade understanding; distinguishes intelligence from data collection/dashboards (compression, prediction, latency); states the ladder; cites the term's provenance in the EnviroAI archive and its recurrence in the foundational essays.
- `src/content/essays/environmental-artificial-intelligence.md` → `/essays/environmental-artificial-intelligence`
  Implementation term. Defines EAI as purpose-built AI answerable to physical ground truth; distinguishes it from generic AI touching environmental data; gives the maturation path to ESI (continuity, coverage, closure); documents the phrase's operational use at EnviroAI since 2020.

Both pages: `status: published`, `schema_type: ScholarlyArticle`, `defined_term` + `defined_term_description` (emit schema.org DefinedTerm bound to the corpus glossary DefinedTermSet), `keywords` and `about` arrays with exact term phrasing, `show_toc: true`.

## Pages updated

- `src/content/essays/environmental-superintelligence.md` — new "The conceptual ladder" section (between "Distinction from related ideas" and "The rigorous substrate") linking down to both new pages. Intro and canonical definition untouched.
- Contextual links added at existing verbatim mentions (no wording changes, first mention only):
  - `first-defender.md` — "environmental intelligence" → EI page
  - `compression-that-sings.md` — "environmental intelligence" → EI page
  - `scaling-imperative-hcn-vs-icn.md` — "environmental intelligence" → EI page
  - `from-fear-to-flourishing.md` — "Environmental Intelligence" → EI page
  - `environmental-latency.md` — "environmental intelligence" (competing-interests note) → EI page
  - `when-ai-speaks-natures-language.md` — "Environmental Intelligence" → EI page
  - `esi-as-missing-foundation-of-ai-alignment.md` — first body "Environmental Superintelligence" → ESI page
- Tag `environmental-intelligence` added to `inverting-the-stack.md` and `scaling-imperative-hcn-vs-icn.md` (EI is the headline subject of both).

## Indexing / metadata / machine-surface changes

- `src/lib/llms.ts` — Key Named Concepts (rendered into `/llms.txt`) gains **Environmental Intelligence** and **Environmental Artificial Intelligence** entries, placed immediately before Environmental Superintelligence so the ladder reads in order.
- `src/lib/site-entities.ts` — Person `knowsAbout` gains "environmental intelligence" and "environmental artificial intelligence" (emitted in the site-wide JSON-LD entity graph on every page).
- `docs/TAG_VOCABULARY.md` — new subject tag `environmental-intelligence` with usage rule. The tag auto-generates `/tags/environmental-intelligence` as a topic index for the cluster.
- `docs/LINES.md` — two new distilled lines (`data-and-intelligence`, `graded-by-the-biosphere`) sourced from the new pages; surface at `/lines` and in the llms.txt Optional section.
- Automatic pickup (no code changes needed): sitemap + lastmod, RSS, `/llms-full.txt`, per-page `.md` endpoints, Pagefind index, archive and essays indexes, IndexNow + Wayback submission on deploy.

## Deliberately not done

- No edits to the archival Constant Contact post bodies (2019–2021 EnviroAI emails). They are cited *from* the new pages as provenance; their text is preserved as-is.
- No `foundational` or `cornerstone` tags on the new pages (reserved tiers; the ESI page remains the cluster's foundational anchor).
- No hero images (none available; optional field).
- No new collections or nav changes—the fixed essays taxonomy already carries definitional pages.

## Recommended follow-up (manual)

- Google Search Console: Request Indexing on the two new URLs once deployed (see `docs/DISCOVERABILITY.md`).
- Consider hero images for the two new pages (`/images/environmental-intelligence-hero.*` naming per convention).
- If a future Zenodo batch is run, the two definitional pages could be deposited for citable DOIs like the treatises.
