# Zenodo Deposit — Phase 1 Report (2026-06-16)

**Branch:** `zenodo-deposit` · **Production calls made:** 0 · **Sandbox live calls made:** 0 (deferred — no token)
**Scope:** `bond-bit-ratio`, `intelligence-leverage-equation`, `thermodynamic-foundations-of-entropic-shepherding`, `bits-protect-its`, `first-defender`

Phase 1 was run under the hard rule: **no calls to zenodo.org (production)**. It was additionally run with **no live sandbox calls**, because no `.env` / `ZENODO_SANDBOX_TOKEN` / `ORCID_ID` is present. Everything below is built from the live repo and validated with a **network-free dry run**.

---

## STEP 1 — Reconciliation

### Header→slug mapping

**None derivable.** `docs/zenodo/` did not exist in this repo (no metadata files in any branch, stash, git history, or `~/Documents`). There were no `# Zenodo Submission: X` headers to match against filenames. Per your "IF YOU DON'T have the files" instruction, **all five descriptions were reconstructed from the live essays + frontmatter** and are marked `reconstructed — needs review` in the manifest. There is therefore no filename↔content mismatch table to report — there were no files.

> If you later drop the real metadata set into `docs/zenodo/`, re-run STEP 1 reconciliation by header and I'll replace the reconstructed descriptions and report any per-file mismatches.

### Canonical fields (source of truth = `src/content/essays/{slug}.md` frontmatter)

| slug | title | date | license | tags (n) | PDF |
|---|---|---|---|---|---|
| bond-bit-ratio | The Bond-Bit Ratio | 2026-05-23 | CC-BY-4.0 | 7 | ✅ 247 KB |
| intelligence-leverage-equation | The Intelligence Leverage Equation | 2026-02-06 | CC-BY-4.0 | 6 | ✅ 631 KB |
| thermodynamic-foundations-of-entropic-shepherding | The Thermodynamic Foundations of Entropic Shepherding | 2026-01-20 | CC-BY-4.0 | 7 | ✅ 442 KB |
| bits-protect-its | Bits Protect Its | 2026-05-22 | CC-BY-4.0 | 7 | ✅ 24 MB |
| first-defender | The First Defender | 2026-05-09 | CC-BY-4.0 | 6 | ✅ 1.1 MB |

**All five `public/pdfs/{slug}.pdf` exist.** All five raw `.md` sources exist. The script attaches both to each record.

### 🚩 Numeric contradiction — SURFACED, NOT RESOLVED

The 10²⁰ vs 10³⁷-per-kg contradiction is real and lives in the frontmatter (source of truth), so it survives reconstruction. Quoted verbatim:

- **Intelligence Leverage Equation** — frontmatter `subtitle`:
  > "Why Knowing Is 10²⁰ Times Cheaper Than Moving—And What This Means for Environmental Protection"

- **Thermodynamic Foundations** — frontmatter `abstract`:
  > "Proves the Bond-Bit Asymmetry—that information processing can substitute for physical intervention at leverage ratios approaching **10³⁷ per kilogram** of matter at room temperature"

- **Thermodynamic Foundations** — its OWN body (line ~269) says something different again:
  > "This yields the Bond-Bit Asymmetry of approximately **10²⁰**—information processing at the [Landauer floor]"

So: ILE pins the asymmetry at **~10²⁰** (dimensionless, "times cheaper"); Thermo's abstract pins it at **10³⁷ per kilogram**; Thermo's body pins it at **~10²⁰**. The same `10³⁷ per kilogram` phrasing is also baked into `src/lib/llms.ts` (`KEY_NAMED_CONCEPTS` → "Bond-Bit Asymmetry"). The reconstructed descriptions **faithfully preserve each essay's own number** rather than silently reconciling them. **Your decision** on which figure is canonical; I did not touch it.

### Other reconciliation flags

1. **Thermo co-authors dropped.** `thermodynamic-foundations` frontmatter lists `co_authors: ['Grok-4.1 Deep Research','Gemini 3.0 Pro Deep Think','ChatGPT 5.2','Claude Opus 4.5 Research']`. The Phase 1 spec fixes Zenodo `creators` to **Anderson only**. These four are not promoted to creators. Recommend adding them as Zenodo **contributors** (`type: Researcher`) in Phase 2 if you want them credited.
2. **Keywords.** Only `bond-bit-ratio` has an explicit frontmatter `keywords` block (used verbatim). The other four derive keywords from `tags` (`keywords_source: derived-from-tags` in the manifest) — review/refine before production.
3. **`first-defender` is a citation-graph outlier.** It contains **zero** internal hyperlinks to any of the other four essays. To keep the set a connected graph with `bond-bit-ratio` as root, I added **one editorial edge** (`first-defender cites bond-bit-ratio`), flagged `provenance: editorial` in the manifest. Drop it if you want the graph to reflect live citations only.

---

## STEP 2 — Manifest

`docs/zenodo/manifest.json`, keyed by slug (plus a `__meta` block the script skips). Each record holds the reconciled fields above + the sibling graph. **Sibling graph (reciprocal, DataCite relation types, `bond-bit-ratio` as root):**

```
bond-bit-ratio  ──isCitedBy──▶  ILE, thermo, bits, first-defender
ILE             ──cites──────▶  bond-bit-ratio        (live)
ILE             ──isSupplementedBy▶ thermo            (live, structural)
thermo          ──cites──────▶  bond-bit-ratio        (live)
thermo          ──isSupplementTo▶ ILE                 (live, structural)
bits            ──cites──────▶  bond-bit-ratio        (live)
first-defender  ──cites──────▶  bond-bit-ratio        (EDITORIAL)
```

Provenance per edge: `live-citation` (real internal hyperlink), `live-structural` (thermo's subtitle/body derives ILE), or `editorial` (first-defender). Every record also carries the canonical web page as `isVariantFormOf` (scheme: url), added by the script at runtime.

---

## STEP 3 — Deposit script

`scripts/zenodo-deposit.mjs`, fully rewritten to spec:

- **`--sandbox` is the default target.** `--production` is **refused unless `--confirm-production` is also passed** (verified: `--production` alone exits 2, no call). Production prints a stern banner even when confirmed.
- **Dry run is the default mode.** Live deposits require **both `--execute` and a token**. `--execute` with no token **force-falls-back to dry run** (verified — no network).
- Reads `ZENODO_SANDBOX_TOKEN` / `ZENODO_TOKEN` + `ORCID_ID` from `.env` (tiny built-in loader, no new deps).
- `creators = [{name:"Anderson, Jed", affiliation:"EnviroAI", orcid: ORCID_ID}]`.
- **Attaches BOTH** `public/pdfs/{slug}.pdf` AND `src/content/essays/{slug}.md` to each record.
- Submits each record to the **Environmental Superintelligence** community (`metadata.communities`); `findOrCreateCommunity()` looks it up and creates it if absent, degrading gracefully (deferring inclusion to the Phase 2 canary) if the token can't create communities.
- **Reserve → cross-link → publish:** creates all five drafts first (reserving DOIs), wires the reciprocal sibling graph across the reserved DOIs, then publishes.
- **Retry with exponential backoff + jitter** on 429/500/502/503/504, honoring `Retry-After`.
- **Post-publish assertions** (live mode): DOI minted, title matches frontmatter, license correct, both files attached, related identifiers present, **ORCID round-trips**, community inclusion request created. Prints record URL + concept DOI + version DOI.

---

## STEP 4 — Dry-run dress rehearsal (network-free)

Full output: `docs/zenodo/DRY_RUN_2026-06-16.txt`. Result:

```
DRY RUN COMPLETE: 5 records, 0 blocking error(s) total.
```

- All five payloads built and printed with exact JSON that would be sent.
- Reciprocal graph materialized over simulated reserved DOIs (`10.5072/zenodo.DRYRUN-000N`): e.g. root `bond-bit-ratio` shows 4× `isCitedBy`; each sibling shows `cites` back to the root; thermo↔ILE show the supplement pair.
- Each payload validated against a local deposit schema (`upload_type=publication`, `publication_type=workingpaper`, exactly one `isVariantFormOf` canonical URL, allowed relation types, DOI/url schemes, license id, 2 attachments present on disk, etc.).
- Only warning across all five: `creators[0].orcid empty` — expected; fills from `.env` `ORCID_ID` in the real run.
- Live sandbox network reachability confirmed separately (HTTP 200) — so the live rehearsal will run as soon as a token is added.

---

## STEP 5 — DOI write-back scaffolding (placeholders only — no real DOIs)

- **Schema:** `src/content/config.ts` already declares optional `doi: z.string().optional()` — left as-is.
- **Citations:** `src/lib/citations.ts` now threads `doi?` into BibTeX (`doi = {…}` line), APA (`https://doi.org/…`), and MLA (DOI as locator) — emitted only when present.
- **Cite block:** `src/components/CiteThis.astro` renders a `DOI: https://doi.org/…` link when set; `src/layouts/ContentLayout.astro` passes `doi={data.doi}` through. (ContentLayout already emitted `doi` into the ScholarlyArticle JSON-LD `identifier`/`sameAs`.)
- **CITATION.cff:** staged with an `identifiers:` block of five placeholder concept DOIs (`10.5281/zenodo.PENDING-{slug}`) and a commented ORCID line on the author. **Fill in Phase 3.**
- **llms.txt:** `src/lib/llms.ts` `lineFor()` carries a commented one-liner showing exactly how to append the DOI per essay; intentionally not active so we never emit placeholder DOIs to crawlers.

**All `doi` frontmatter values remain `""` / placeholder.** No essay frontmatter was given a DOI.

---

## STEP 6 — Phase 2 & Phase 3 plans

### Phase 2 — Production canary (human-reviewed, separate session)

> Precondition: you've reviewed this report + the dry-run payloads + resolved (or consciously deferred) the 10²⁰/10³⁷ contradiction, and added `ZENODO_TOKEN` (production) + `ORCID_ID` to `.env`.

1. **Sandbox first, for real.** Add `ZENODO_SANDBOX_TOKEN`; run `node scripts/zenodo-deposit.mjs --execute` (sandbox). Confirm all five publish, the graph links, ORCID round-trips, community inclusion request is created. Capture the five sandbox record URLs + concept/version DOIs. *(This is the real STEP 4 that was deferred this session.)*
2. **Production canary — `bond-bit-ratio` ONLY.** Temporarily scope the run to the single root slug (or add a `--only=bond-bit-ratio` filter), then `node scripts/zenodo-deposit.mjs --production --confirm-production --execute`.
3. **Assert and STOP.** GET the published record; verify DOI minted, title/date/license, both files attached, `isVariantFormOf` canonical URL present, ORCID round-trips, community inclusion request created. **Do not deposit the other four.** Record the concept DOI. Human review of the live record before proceeding.
4. Decide on **contributors** (thermo's four AI co-authors) and final **keywords** before Phase 3, since those go into permanent records.

### Phase 3 — Remaining four + DOI write-back

1. With the canary verified, deposit the remaining four to production (reserve → cross-link including the already-minted `bond-bit-ratio` DOI → publish). The script's reserve-then-link step must read the canary's real concept DOI for the root so the four link to the live root, not a freshly reserved one. *(Add a small "known DOIs" override map for already-published slugs.)*
2. **Write back real concept DOIs:**
   - Set `doi:` in each `src/content/essays/{slug}.md` frontmatter (the cite block, JSON-LD, and citation formats light up automatically).
   - Replace the five `10.5281/zenodo.PENDING-{slug}` placeholders in `CITATION.cff` with real concept DOIs; uncomment the author `orcid`.
   - Activate the `llms.ts` DOI line (uncomment) so `/llms.txt` + `/llms-full.txt` expose each DOI.
3. `npm run build`, verify, commit, push, confirm Netlify deploy. Merge `zenodo-deposit` per your normal flow.

---

## Files in this branch

- `docs/zenodo/manifest.json` — reconciled metadata + reciprocal sibling graph (NEW)
- `docs/zenodo/DRY_RUN_2026-06-16.txt` — full network-free dry-run output (NEW)
- `docs/zenodo/PHASE1_REPORT_2026-06-16.md` — this file (NEW)
- `scripts/zenodo-deposit.mjs` — full rewrite to spec (REWRITTEN)
- `src/lib/citations.ts`, `src/components/CiteThis.astro`, `src/layouts/ContentLayout.astro`, `src/lib/llms.ts`, `CITATION.cff` — DOI write-back scaffolding, placeholders only (EDITED)

`main` untouched. No production calls. No live sandbox calls.
