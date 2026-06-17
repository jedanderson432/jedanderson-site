#!/usr/bin/env python3
"""Convert the HF corpus JSONL to Parquet with an explicit, stable schema.

Usage:
    python scripts/hf_jsonl_to_parquet.py <in.jsonl> <out.parquet>

The schema is pinned (not inferred) so the column types are identical across
runs regardless of which records happen to carry a DOI:
    slug, title, type, date, abstract, body_markdown, canonical_url,
    license            -> string
    tags               -> list<string>
    word_count         -> int64
    doi                -> string (nullable)

Also re-validates the written Parquet: row count matches the JSONL, and no
body_markdown begins with a YAML frontmatter fence ('---').
"""
import json
import sys

import pyarrow as pa
import pyarrow.parquet as pq

SCHEMA = pa.schema([
    ("slug", pa.string()),
    ("title", pa.string()),
    ("type", pa.string()),
    ("date", pa.string()),
    ("tags", pa.list_(pa.string())),
    ("abstract", pa.string()),
    ("body_markdown", pa.string()),
    ("canonical_url", pa.string()),
    ("word_count", pa.int64()),
    ("license", pa.string()),
    ("doi", pa.string()),  # nullable
])


def main() -> int:
    in_path, out_path = sys.argv[1], sys.argv[2]
    rows = []
    with open(in_path, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                rows.append(json.loads(line))

    # Build columnar arrays in the pinned field order.
    cols = {f.name: [r.get(f.name) for r in rows] for f in SCHEMA}
    table = pa.table(cols, schema=SCHEMA)
    pq.write_table(table, out_path, compression="zstd")

    # Round-trip validation.
    back = pq.read_table(out_path)
    assert back.num_rows == len(rows), f"row count drift: {back.num_rows} != {len(rows)}"
    assert back.schema.equals(SCHEMA), "parquet schema drift"
    # Flag only a leftover frontmatter fence: a first line that is solely
    # '---'. Prose opening with dashes-then-text is genuine content.
    def is_fence(b: str) -> bool:
        s = b.lstrip("﻿")
        first = s.split("\n", 1)[0].rstrip(" \t\r")
        return first == "---"

    bad = [b for b in back.column("body_markdown").to_pylist() if is_fence(b)]
    assert not bad, f"{len(bad)} body_markdown value(s) start with a frontmatter fence"

    print(f"{back.num_rows} rows, {len(SCHEMA)} cols, schema OK, bodies clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
