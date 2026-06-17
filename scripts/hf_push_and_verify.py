#!/usr/bin/env python3
"""Phase 2: create the PUBLIC HF dataset repo, push the three artifacts,
then GET the dataset back and verify it is live (900 rows, card, license)."""
import io
import os
import sys

import pyarrow.parquet as pq
from huggingface_hub import HfApi, hf_hub_download

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "hf-dataset")
EXPECTED_ROWS = 900


def load_env():
    env = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as fh:
        for line in fh:
            m = line.strip()
            if not m or m.startswith("#") or "=" not in m:
                continue
            k, v = m.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def main():
    env = load_env()
    token = env["HF_TOKEN"]
    user = env["HF_USERNAME"]
    repo_id = f"{user}/environmental-superintelligence-corpus"
    api = HfApi(token=token)

    # 1. Create the PUBLIC dataset repo (idempotent).
    api.create_repo(repo_id=repo_id, repo_type="dataset", private=False, exist_ok=True)
    print(f"[create] {repo_id} (public, dataset) ready")

    # 2. Upload exactly the three artifacts.
    for fname in ("corpus.parquet", "corpus.jsonl", "README.md"):
        api.upload_file(
            path_or_fileobj=os.path.join(OUT, fname),
            path_in_repo=fname,
            repo_id=repo_id,
            repo_type="dataset",
            commit_message=f"Add {fname}",
        )
        print(f"[upload] {fname}")

    print("\n=== VERIFY (GET dataset back from the Hub) ===")
    info = api.dataset_info(repo_id)
    files = sorted(s.rfilename for s in info.siblings)
    print("private:", info.private)
    print("files in repo:", files)

    # License metadata from the parsed card.
    card = info.card_data.to_dict() if info.card_data else {}
    print("card license metadata:", card.get("license"))
    print("card pretty_name:", card.get("pretty_name"))
    print("card configs present:", "configs" in card)

    # Download the parquet back and count rows.
    local = hf_hub_download(repo_id=repo_id, repo_type="dataset",
                            filename="corpus.parquet", token=token)
    table = pq.read_table(local)
    print(f"parquet rows (downloaded from Hub): {table.num_rows}")
    print(f"parquet cols: {len(table.schema)} -> {[f.name for f in table.schema]}")

    # Download the README back and confirm the card body rendered/non-empty.
    readme_local = hf_hub_download(repo_id=repo_id, repo_type="dataset",
                                   filename="README.md", token=token)
    with open(readme_local, encoding="utf-8") as fh:
        readme = fh.read()
    has_thesis = "Bits Protect Its" in readme
    has_doi = "10.5281/zenodo.20724187" in readme

    url = f"https://huggingface.co/datasets/{repo_id}"
    print("\n=== ASSERTIONS ===")
    checks = [
        ("repo is public", info.private is False),
        ("all 3 files present", set(files) >= {"corpus.parquet", "corpus.jsonl", "README.md"}),
        (f"parquet has {EXPECTED_ROWS} rows", table.num_rows == EXPECTED_ROWS),
        ("parquet has 11 columns", len(table.schema) == 11),
        ("license metadata == cc-by-4.0", str(card.get("license")).lower() == "cc-by-4.0"),
        ("card body present (thesis)", has_thesis),
        ("card lists Zenodo DOI", has_doi),
    ]
    ok = True
    for name, cond in checks:
        print(f"  {'PASS' if cond else 'FAIL'}  {name}")
        ok = ok and bool(cond)

    print(f"\nLIVE DATASET URL: {url}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
