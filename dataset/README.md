---
license: cc-by-4.0
language:
  - en
pretty_name: "Jed Anderson — Corpus"
tags:
  - environmental-superintelligence
  - information-physics
  - essays
---

# Jed Anderson — Corpus

A machine-readable export of the published writing of Jed Anderson on
environmental superintelligence, information physics, and faith-integrated
first-principles thinking. Central thesis: **Bits Protect Its**—information
accumulates causal sovereignty over matter and energy.

## Canonical source

The canonical source of this corpus is **https://jedanderson.org**. This
dataset is a variant format of that site, provided for convenient bulk
ingestion. Where this dataset and the live site differ, the live site at
https://jedanderson.org is authoritative.

## Files

- `corpus.jsonl` — one JSON object per published piece (899 rows). Fields:
  `title`, `slug`, `type`, `date`, `tags`, `abstract`, `body_markdown`,
  `canonical_url`, `license`.
- `canonical-claims.json` — build-time deterministic extraction of every
  numerical claim in the published essay corpus, each with a stable
  identifier, source-essay slug, and sentence-level context.

## License

All content is licensed **CC-BY-4.0** (some individual pieces are CC0—see
each piece's `license` field). Attribution: Jed Anderson, https://jedanderson.org.

## Provenance

Generated deterministically from the site source by
`scripts/export-hf-dataset.mjs`. Each row's `canonical_url` links back to
the authoritative HTML page; appending `.md` to that URL returns the same
markdown body carried in `body_markdown`.
