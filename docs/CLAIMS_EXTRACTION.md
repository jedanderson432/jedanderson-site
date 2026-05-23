# Claims Extraction Pipeline

The site publishes a build-time-refreshed dataset of every numerical claim
in the published essay corpus at:

- HTML browser: <https://jedanderson.org/data>
- Raw JSON: <https://jedanderson.org/data/canonical-claims.json>

This document is the maintenance reference: how the pipeline works,
how to add manual overrides, how to extend the unit allow-list, and
how to debug a missed or false-positive match.

## Design constraints

1. **Deterministic.** Same input → identical output on every build.
   No LLM calls. No timestamps in the output. No network reads.
2. **Build-gated.** The Astro build fails if the extractor crashes or
   produces malformed JSON. The validation hook in `astro.config.mjs`
   re-parses the on-disk JSON before the site renders.
3. **Stable identifiers.** Each row's `id` is a SHA-256 prefix over
   `(essay_slug, value, unit, normalized_sentence)`. Trivial wording
   changes outside the containing sentence leave the id stable.
4. **Manual overrides are append-and-overlay.** The extractor produces
   `auto-<hash>` rows; a hand-maintained JSON file adds new rows
   (`manual-<slug>`) and shallowly overlays fields on existing
   `auto-<hash>` rows.

## Files

| Path | Purpose |
|------|---------|
| [`scripts/extract-claims.mjs`](../scripts/extract-claims.mjs) | The extractor. Runs as the `prebuild` step of `npm run build`. |
| [`data/manual-claims-extras.json`](../data/manual-claims-extras.json) | Hand-curated overrides + missed claims. JSON-with-comments (`//` line comments stripped before parsing). |
| `public/data/canonical-claims.json` | The merged output. **Generated — do not edit.** Committed to the repo so direct JSON consumers don't depend on a fresh build. |
| [`src/pages/data.astro`](../src/pages/data.astro) | The HTML browser at `/data`. |
| [`astro.config.mjs`](../astro.config.mjs) | Integration that re-validates the JSON during Astro build. |

## Run it

```bash
npm run extract-claims    # extractor only
npm run build             # extractor → astro build → pagefind
```

The extractor logs:

```
[extract-claims] Extracted N claims from M essays; merged P manual entries (Q overrides, R new); final dataset has S rows.
```

## Pattern catalog

The extractor runs a battery of regex matchers against each essay's
markdown body (after stripping frontmatter, code blocks, inline code,
markdown link URLs, bare URLs, DOIs, arXiv IDs, reference-style
citations like `[12]`, HTML tags, and heading lines). Matches that
overlap each other are de-duplicated greedily — the longest match wins.

| Pattern | Example match | Notes |
|---------|---------------|-------|
| `scinote-unit` | `2.87 × 10⁻²¹ J/bit` | Scientific notation with a unit from the allow-list. Handles both ASCII (`10^-21`) and Unicode superscript (`10⁻²¹`) exponents. |
| `scinote-bare` | `10²⁰`, `1.5 × 10⁵³` | Bare powers of 10 with no unit. Requires `|exp| ≥ 2` to avoid matching `10` as `10^1`. Word boundary on `10` so arXiv IDs like `9310026` don't leak. |
| `multiplier` | `240×`, `4,500×`, `10²⁰×` | Literal `×` suffix required. |
| `percent` | `90%`, `1.55%` | `\d+(\.\d+)?\s*%`. |
| `si-unit` | `413 kJ/mol`, `1.55 °C`, `300 K` | Number followed by horizontal whitespace and a unit from the allow-list. Excludes leading-period footnote markers and cross-paragraph matches. |
| `duration` | `27 years`, `3-decade`, `30 minutes` | Allows hyphen separator (`two-to-three-decade`). |
| `count` | `1,700 forecasters`, `6 of 9 planetary boundaries` | Narrow allow-list of nouns (see below) — kept tight so `3 reasons` / `4 steps` don't pollute. |

### Unit allow-list

Maintained in `UNIT_LIST` near the top of `extract-claims.mjs`. Ordered
longest-first so composite units like `kJ/mol` beat `J`. To add a unit:

1. Add it to `UNIT_LIST` in the appropriate group, preserving the
   longest-first ordering within the group.
2. Run `npm run extract-claims` and confirm the matcher fires.
3. Commit `extract-claims.mjs` and the regenerated `canonical-claims.json` together.

### Count allow-list

Maintained in `COUNT_NOUNS`. Currently includes: `species`, `essays`,
`papers`, `tokens`, `cells`, `molecules`, `bonds`, `genomes`,
`satellites`, `sensors`, `forecasters`, `co-authors`,
`orders of magnitude`, `doublings`, `tipping elements`, `datasets`,
`planetary boundaries`, `grid cells`, `verification targets`,
`countries`, `authors`, `mass extinctions`. **Keep this list narrow.**
Any generic noun (`reasons`, `things`, `steps`) will catch noise across
the corpus.

### Duration allow-list

`DURATION_NOUNS` — singular and plural of year / month / decade /
century / millennium / day / hour / minute / second.

## Manual overrides

`data/manual-claims-extras.json` is a JSON array. The extractor strips
`//` line comments before parsing, so you can annotate inline.
Per-row schema:

```json
{
  "id":               "manual-<slug>" | "auto-<hash>",
  "essay_slug":       "bond-bit-ratio",
  "value":            "240×",
  "unit":             "ratio",
  "type":             "manual",
  "claim":            "<sentence>",
  "context":          "<optional ±200 chars>",
  "line":             123,
  "epistemic_status": "established" | "framework-dependent" | "estimated" | "bet" | "needs_review",
  "uncertainty":      "<free-text note>",
  "last_verified":    "YYYY-MM-DD",
  "citation":         "<optional source>"
}
```

Two operations:

1. **Add a new row** the auto-extractor cannot catch. ID must start with
   `manual-`.
2. **Override an auto-extracted row.** ID is the exact `auto-<hash>`
   from the existing dataset. Provided fields shallowly overlay the
   auto row; omitted fields fall through unchanged.

### Finding the id of an existing auto row

Either browse `public/data/canonical-claims.json` directly, or grep
the live `/data` page (each row has its id as the HTML `id` attribute,
so URL fragments like `/data#auto-b413e5927b04` work).

## Epistemic status vocabulary

| Value | Meaning |
|-------|---------|
| `established` | Verified physics, measured to high precision, or directly observed. |
| `framework-dependent` | Correct within a particular theoretical framework; alternate frameworks give different answers. |
| `estimated` | Order-of-magnitude or model-based; precise number is a calculation under simplifying assumptions. |
| `bet` | Philosophical position or extrapolated trend; supported by evidence, not derived. |
| `needs_review` | Default for auto-extracted rows. Means "not yet classified." |

## False-positive triage

If the extractor pulls a spurious row:

1. Check the `pattern` field on the auto row to identify which matcher fired.
2. Tighten the regex in `scripts/extract-claims.mjs`, or add a
   negative lookbehind / lookahead, then re-run the extractor.
3. If the row is real but mis-classified, override it via
   `manual-claims-extras.json` with the correct
   `epistemic_status` and an `uncertainty` note explaining the case.

## False-negative triage

If a real claim is missed:

1. Check whether the claim has a regex-compatible form. Many prose
   claims ("two to three decades", "six of nine planetary boundaries")
   are intentionally outside the auto-extractor's scope.
2. For numerical-but-missed cases, decide whether to extend a pattern
   (add a unit to `UNIT_LIST`, add a count noun to `COUNT_NOUNS`) or
   add the claim as a `manual-` row.

## Deterministic-output discipline

The extractor must never:

- Read the wall clock or include timestamps in the output.
- Hit the network.
- Depend on filesystem order (always `sort()` after `readdir`).
- Call an LLM.

The extractor may:

- Read every file under `src/content/essays/` and `data/`.
- Sort and hash deterministically.
- Validate its own output before writing.

If you add a new feature, the test is: run `npm run extract-claims`
twice in a row; the on-disk `canonical-claims.json` must be byte-identical.
