# Scholarly-Graph Connectivity Report

**Date:** 2026-07-09
**Session scope:** SSRN write-back, identity edges, Mc² audit, Zenodo draft staging, external verification.
**Verification mode:** read-only fetches, no authentication (except the Zenodo draft creation, which used `ZENODO_TOKEN` from `.env` and created **drafts only — nothing was published**).

## Legend

- **CONNECTED** — edge exists and was verified this session.
- **MISSING–MANUAL** — edge absent; a human action (listed) will create it. Not blocked by anything technical.
- **MISSING–BLOCKED** — edge could not be verified because an endpoint blocked automated access (not a failure; expected).

---

## Edge table

| # | Edge | State | Evidence / Manual action |
|---|------|-------|--------------------------|
| 1 | **site → Zenodo** (5 published concept DOIs) | **CONNECTED** | All 5 essays carry `doi:` in frontmatter, emitted as JSON-LD `identifier`+`sameAs` and in llms.txt: bond-bit-ratio→20723029, bits-protect-its→20724187, intelligence-leverage-equation→20724192, thermodynamic-foundations→20724194, first-defender→20724227. |
| 2 | **Zenodo → site** (5 published) | **CONNECTED** | DataCite records resolve `findable`; deposits carry `isVariantFormOf` the canonical URL (via `scripts/zenodo-deposit.mjs`). |
| 3 | **site → SSRN** (bond-bit-ratio) | **CONNECTED** | Deployed page JSON-LD `sameAs` = `["https://doi.org/10.5281/zenodo.20723029","https://ssrn.com/abstract=6958708"]`; visible §6 line; llms.txt line carries `(SSRN: …)`. |
| 4 | **SSRN → site** (backlink) | **MISSING–BLOCKED** | `https://ssrn.com/abstract=6958708` returned **HTTP 403** (bot block) — expected, not a failure. **Manual (optional):** confirm in a browser that the SSRN abstract page lists the canonical URL / jedanderson.org in its "Suggested Citation"/links. |
| 5 | **site → ORCID** | **CONNECTED** | Person JSON-LD `sameAs` includes `https://orcid.org/0009-0003-1807-2459`; also an `identifier` PropertyValue. |
| 6 | **ORCID → site / ORCID Works** | **MISSING–MANUAL** | ORCID public Works API returns **zero works**. **Manual:** in ORCID → *Works → Add → Search & link → DataCite*, import the 5 Zenodo DOIs (they are already ORCID-bound on the DataCite side); and add `https://jedanderson.org` under *Websites & social links* if not present. |
| 7 | **ORCID ↔ DataCite** (auto-population of Works) | **MISSING–MANUAL** | DataCite creator metadata for all 5 DOIs is ORCID-bound (`nameIdentifiers` → 0009-0003-1807-2459), but the DOIs have **not** propagated into ORCID Works. **Manual:** enable ORCID *Trusted Party → DataCite auto-update* (one-time OAuth grant) so future/existing DataCite DOIs flow into Works automatically. |
| 8 | **site → Wikidata** | **CONNECTED** | Person JSON-LD `sameAs` includes `https://www.wikidata.org/wiki/Q140265360`. |
| 9 | **Wikidata → site** | **CONNECTED** | Q140265360 has P856 (official website) = `https://jedanderson.org`; P496 (ORCID) = 0009-0003-1807-2459. |
| 10 | **Wikidata ↔ SSRN** | **MISSING–MANUAL** | Q140265360 has **no** SSRN author ID (P8517). **Manual:** add statement **P8517 (SSRN author ID) = `12031408`** to Q140265360. |
| 11 | **site → Hugging Face** (profile + dataset) | **CONNECTED** | Person JSON-LD `sameAs` includes `https://huggingface.co/jedanderson`; About page lists the dataset `environmental-superintelligence-corpus`. Both resolve HTTP 200. |
| 12 | **Wikidata "Environmental superintelligence" concept item** | **MISSING–MANUAL** | Wikidata search for "environmental superintelligence" returns **no results** — the concept item does not exist. **Manual (optional):** create a Wikidata item for the concept, linking it to Q140265360 (P50/author or P138/named-after as appropriate) and to the canonical definition page. |
| 13 | **site ↔ Zenodo** (3 new drafts: Angel, Grader, reward-hacking) | **MISSING–MANUAL** | 3 Zenodo **drafts** staged this session (unpublished, no DOI activated, no site frontmatter written — per instruction). **Manual:** review each draft, **Publish**, then write each minted concept DOI into the essay frontmatter `doi:` field. Draft edit URLs listed below. |
| 14 | **Grader → Angel** (citation edge) | **CONNECTED (draft-level)** | Grader draft `related_identifiers` = `cites 10.5281/zenodo.21285319`. Verified the Grader markdown cites Jed's Angel in-body (§ "The physics of Jed's Angel…" and the "Companion piece: *Jed's Angel*" reference). Becomes a live edge on publish. |

---

## Zenodo draft edit URLs (unpublished — DRAFTS ONLY)

All three are `state: unsubmitted`, `submitted: false`. Nothing was published. Metadata: upload_type=publication/workingpaper; creator = Anderson, Jed / Independent Researcher, Houston, Texas / ORCID 0009-0003-1807-2459; license cc-by-4.0; community environmental-superintelligence; description = each piece's abstract; keywords from tags.

| Piece | Prereserved DOI | Edit URL |
|-------|-----------------|----------|
| Jed's Angel | `10.5281/zenodo.21285319` | https://zenodo.org/deposit/21285319 |
| Reality as the Only Incorruptible Grader | `10.5281/zenodo.21285322` | https://zenodo.org/deposit/21285322 |
| Reward Hacking as a Disembedding Problem | `10.5281/zenodo.21285324` | https://zenodo.org/deposit/21285324 |

**Note on related identifiers:** per the session instruction ("No other related identifiers, no synthetic cross-citations anywhere"), the only related-identifier wired was the Grader→Angel `cites` edge. The drafts were **not** given an `isVariantFormOf` canonical-URL link (the convention used by the published corpus in `scripts/zenodo-deposit.mjs`). If desired, add `isVariantFormOf` = canonical URL on each draft before publishing.

---

## Manual-action checklist (all MISSING–MANUAL edges)

1. **ORCID Works** — import the 5 Zenodo DOIs via *Search & link → DataCite*; add `https://jedanderson.org` to profile links. *(edges #6, #7)*
2. **ORCID auto-update** — grant DataCite trusted-party OAuth so DOIs auto-populate Works. *(edge #7)*
3. **Wikidata SSRN ID** — add P8517 = `12031408` to Q140265360. *(edge #10)*
4. **Wikidata concept item (optional)** — create an "Environmental superintelligence" item linked to Q140265360. *(edge #12)*
5. **Publish the 3 Zenodo drafts** (after review), then write minted DOIs into essay frontmatter. Optionally add `isVariantFormOf` canonical URL first. *(edges #13, #14)*
6. **SSRN backlink (optional)** — verify in-browser that the SSRN abstract page links back to the canonical URL. *(edge #4)*

---

## Gates

- `npm run build` — **PASS** (907 pages indexed; slug + claims validation passed).
- Rendered JSON-LD verified on built pages:
  - `dist/about/index.html` Person `sameAs` includes ORCID, Wikidata, `ssrn.com/author=12031408`, `huggingface.co/jedanderson`.
  - `dist/essays/bond-bit-ratio/index.html` `sameAs` = `["https://doi.org/10.5281/zenodo.20723029","https://ssrn.com/abstract=6958708"]`.
- Deployed (live) verification: bond-bit-ratio SSRN line + JSON-LD edge live; llms.txt regenerated with `(SSRN: …)`; Jed's Angel and Incorruptible Grader essays are **live/published** (status: published, HTTP 200).

## Constraints honored

- `ZENODO_TOKEN` read from `.env` only; never printed or logged.
- **No Zenodo publish** — all 3 depositions left as drafts.
- **No site content flipped** from `status: draft` to `published`.
- Phase 3 (Mc² audit) was **read-only** on content — no content files modified; inventory written to `docs/MC2_AUDIT.md`.
- New Zenodo DOIs **not** written into site frontmatter (deferred to post-publish write-back).
