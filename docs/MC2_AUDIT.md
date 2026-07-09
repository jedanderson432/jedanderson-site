# Retired-Framing Audit — Mc² / leverage-figure / Λ

**Date:** 2026-07-09
**Scope (read-only):** `src/content/**`, `src/preprints/**`, `src/lib/**`, `src/pages/**`, `docs/**`
**Patterns:** `Mc²`/`Mc^2`/`mc²`/`mc^2`; `10²⁰`/`10^20` and `10³⁷`/`10^37` as leverage figures; any `Λ =`/`Lambda =` rendering.
**Action taken:** none. This is an inventory only — no content was modified.

## Summary

- Every affected **site-content** piece (`src/content/essays/*.md`) is **published**. No drafts carry the retired framing.
- The Intelligence Leverage Equation `Λ = Mc² / (I·k_BT·ln 2)` and its `10²⁰`/`3×10³⁷` leverage figures are load-bearing in the ILE and thermodynamic-foundations essays and appear as cross-reference lines in several others.
- Each affected published essay has a `pdf:` artifact. Where the equation appears in the essay **body** (not merely a related-links line), the PDF **likely embeds** the equation — flagged below. Binaries were not opened.
- `src/preprints/bond-bit-ratio-preprint.tex` carries both `10^{20}` and `10^{37}` figures, explicitly hedged as "provisional and more contestable."
- `src/lib/llms.ts` emits the equation in the corpus glossary (llms.txt) as a named-concept definition.
- `docs/**` hits are internal audit/manifest/ingestion notes — not published site content.

---

## A. Published site content (`src/content/essays/`) — published-first

| Path | Line | Context (one line) | Status | PDF likely embeds eq.? |
|---|---|---|---|---|
| intelligence-leverage-equation.md | 24, 214, 366, 550 | `Λ = Mc² / (I · k_B T · ln 2)` — the equation, stated repeatedly | published | **Yes** (equation is the subject) |
| intelligence-leverage-equation.md | 9 | abstract: "…Intelligence Leverage Equation Λ = Mc² / (I·k_BT·ln 2)…" | published | **Yes** |
| intelligence-leverage-equation.md | 212, 384, 589 | `E = mc²` (Einstein mass-energy, numerator basis) | published | **Yes** |
| intelligence-leverage-equation.md | 218, 220, 573 | numerator `Mc²` = 9×10¹⁶ J for 1 kg | published | **Yes** |
| intelligence-leverage-equation.md | 228 | `Λ = (9 × 10¹⁶ J)/(2.9 × 10⁻²¹ J) ≈ 3 × 10³⁷` — 10³⁷ leverage figure | published | **Yes** |
| thermodynamic-foundations-of-entropic-shepherding.md | 20, 372, 620, 654 | derives/states `Λ = Mc²/(I·k_B·T·ln2)` | published | **Yes** (full derivation) |
| thermodynamic-foundations-of-entropic-shepherding.md | 350, 352, 580, 664 | `E = mc²` / `E_max = Mc²` ultimate upper bound | published | **Yes** |
| thermodynamic-foundations-of-entropic-shepherding.md | 268 | `Effective Λ = … 10²⁵ bonds …` worked leverage example | published | **Yes** |
| thermodynamic-foundations-of-entropic-shepherding.md | 396, 644 | `≈ 3 × 10³⁷` maximum leverage (1 kg), 10³⁷ figure | published | **Yes** |
| general-theory-of-environmental-leverage.md | 34, 38, 40, 42, 62 | `Λ = Mc² / (I · k_BT · ln 2)`; decomposes numerator `Mc²` | published | **Yes** (equation in body) |
| nature-and-simplicity.md | 158, 160 | `Λ = Mc² / (I · k T · ln 2)` with in-body gloss of `Mc²` | published | **Yes** (equation in body) |
| self-writing-universe.md | 232 | "…Intelligence Leverage Equation Λ = Mc² / (I · k T ln 2) made concrete…"; 10¹⁹–10²⁰ | published | **Yes** (equation in body) |
| observation-is-protection.md | 369 | `Λ = (8.9 × 10⁷ J)/(2.87 × 10⁻¹² J) ≈ 10²⁰` — 10²⁰ leverage figure | published | **Yes** (figure in body) |
| compute-we-owe-the-earth.md | 74 | `Λ = Mc² / (I · k_BT · ln 2)` in body | published | **Yes** (equation in body) |
| compute-we-owe-the-earth.md | 205 | related-links line referencing ILE `Λ = Mc²/(I·k_BT·ln 2)` | published | Maybe (cross-ref line) |
| artificial-energy.md | 84 | figure alt-text: Tier 1 "Mass-Destruction Energy (E=mc²…)" — generic mass-energy, **not** the ILE | published | Maybe (generic `E=mc²`, not leverage eq.) |
| bond-bit-ratio.md | 121 | related-essay link: "…Intelligence Leverage Equation—Λ = Mc² / (I·k_BT·ln 2)…" | published | Unlikely (link-only; PDF is the floor-ratio derivation) |
| magnifica-vita.md | 238 | related-links line referencing ILE `Λ = Mc²/(I·k_BT·ln 2)` | published | Unlikely (cross-ref line) |

**Published pieces flagged as likely embedding the retired equation in their PDF artifact** (`pdf:` field set, equation present in body):
`intelligence-leverage-equation`, `thermodynamic-foundations-of-entropic-shepherding`, `general-theory-of-environmental-leverage`, `nature-and-simplicity`, `self-writing-universe`, `observation-is-protection`, `compute-we-owe-the-earth`.
Lower confidence / generic-only: `artificial-energy` (generic `E=mc²`), `bond-bit-ratio` and `magnifica-vita` (cross-reference lines only).

---

## B. Preprints (`src/preprints/`)

| Path | Line | Context (one line) | Status |
|---|---|---|---|
| bond-bit-ratio-preprint.tex | 121 | "…of order `$10^{20}$` per kilogram … rising to a theoretical ceiling near `$10^{37}$` per kilogram…"; flagged **provisional and more contestable** | preprint source (repo artifact; not a content collection) |

`reward-hacking-disembedding.tex` — **no** Mc²/Λ/leverage-figure hits.

---

## C. Site infrastructure (`src/lib/`, `src/pages/`)

| Path | Line | Context (one line) | Status |
|---|---|---|---|
| src/lib/llms.ts | 46 | KEY_NAMED_CONCEPTS glossary entry: "`Λ = Mc² / (I · k_B T · ln 2)`. A dimensionless ratio…" — emitted into llms.txt | code (emits to public llms.txt) |

No hits in `src/pages/`.

---

## D. Internal docs (`docs/**`) — not published site content

These are audit/manifest/ingestion working files, not site-visible content. Listed for completeness.

| Path | Lines (representative) | Nature |
|---|---|---|
| docs/BOND_BIT_CITATION_AUDIT.md | 39, 41, 162, 193, 196, 236, 244, 249, 260, 271, 274, 282, 369, 390, 428, 460, 498, 499, 518, 521, 543, 653 | Prior citation-audit notes quoting the equation and 10²⁰/10³⁷ figures |
| docs/INGESTION_PROMPT.md | 150 | Ingestion reference table row for the ILE essay |
| docs/INGESTION_TRIAGE.md | 151 | Triage abstract quoting `Λ = Mc² / (I·k_BT·ln 2)` |
| docs/zenodo/manifest.json | 84, 106 | Deposit manifest abstracts quoting the equation |
| docs/zenodo/DRY_RUN_2026-06-16.txt | 87, 145 | Dry-run log echoing manifest abstracts |
| docs/zenodo/PHASE1_REPORT_2026-06-16.md | 47 | "3×10³⁷ per kg … theoretical ceiling … unchanged, labeled ceiling" |

---

*End of audit. No files were modified in producing this inventory.*
