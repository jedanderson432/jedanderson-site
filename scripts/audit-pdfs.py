"""Audit PDF coverage across all published content collections."""
import re
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(r"C:\Users\jedan\jedanderson-site")
CONTENT = ROOT / "src" / "content"
PDFS = ROOT / "public" / "pdfs"

COLLECTIONS = ["essays", "posts", "books", "letters", "papers", "notes", "speeches"]

def parse_fm(text):
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    fm_text = m.group(1)
    fm = {}
    for line in fm_text.split("\n"):
        kv = re.match(r"^([a-zA-Z_]+):\s*(.*)$", line)
        if kv:
            k, v = kv.group(1), kv.group(2).strip()
            # Strip surrounding quotes
            if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                v = v[1:-1]
            fm[k] = v
    return fm

results = defaultdict(list)
summary = {
    "with_pdf_file_and_fm": 0,
    "with_pdf_file_no_fm": 0,
    "with_fm_no_pdf_file": 0,
    "neither": 0,
    "total": 0,
}

all_pieces = []

for coll in COLLECTIONS:
    coll_dir = CONTENT / coll
    if not coll_dir.exists():
        continue
    for md_path in sorted(coll_dir.glob("*.md")):
        slug = md_path.stem
        text = md_path.read_text(encoding="utf-8")
        fm = parse_fm(text)
        status = fm.get("status", "published")
        if status == "draft":
            continue
        has_pdf_file = (PDFS / f"{slug}.pdf").exists()
        has_pdf_fm = "pdf" in fm and fm["pdf"]
        pdf_canonical = fm.get("pdf_canonical", "").lower() == "true"
        all_pieces.append({
            "collection": coll,
            "slug": slug,
            "title": fm.get("title", ""),
            "type": fm.get("type", coll[:-1]),
            "has_pdf_file": has_pdf_file,
            "has_pdf_fm": has_pdf_fm,
            "pdf_canonical": pdf_canonical,
            "interactive_url": fm.get("interactive_url", ""),
        })
        summary["total"] += 1
        if has_pdf_file and has_pdf_fm:
            summary["with_pdf_file_and_fm"] += 1
        elif has_pdf_file and not has_pdf_fm:
            summary["with_pdf_file_no_fm"] += 1
            results["pdf_file_but_no_fm"].append(f"{coll}/{slug}")
        elif has_pdf_fm and not has_pdf_file:
            summary["with_fm_no_pdf_file"] += 1
            results["fm_but_no_pdf_file"].append(f"{coll}/{slug}")
        else:
            summary["neither"] += 1
            results["neither"].append(f"{coll}/{slug}")

# Per-collection breakdown
by_coll = defaultdict(lambda: {"total": 0, "complete": 0, "missing_pdf": 0, "missing_fm": 0})
for p in all_pieces:
    c = p["collection"]
    by_coll[c]["total"] += 1
    if p["has_pdf_file"] and p["has_pdf_fm"]:
        by_coll[c]["complete"] += 1
    if not p["has_pdf_file"]:
        by_coll[c]["missing_pdf"] += 1
    if not p["has_pdf_fm"]:
        by_coll[c]["missing_fm"] += 1

print("=== SUMMARY ===")
print(json.dumps(summary, indent=2))
print("\n=== BY COLLECTION ===")
for c in sorted(by_coll.keys()):
    print(f"  {c}: {dict(by_coll[c])}")

print("\n=== SAMPLE: 'neither' (first 20) ===")
for p in [x for x in all_pieces if not x["has_pdf_file"] and not x["has_pdf_fm"]][:20]:
    print(f"  {p['collection']}/{p['slug']}")

print("\n=== SAMPLE: 'fm_but_no_pdf_file' (first 10) ===")
for p in [x for x in all_pieces if x["has_pdf_fm"] and not x["has_pdf_file"]][:10]:
    print(f"  {p['collection']}/{p['slug']}")

# Persist full report
(ROOT / "scripts" / "_pdf-audit.json").write_text(
    json.dumps({"summary": summary, "by_collection": dict(by_coll), "pieces": all_pieces}, indent=2),
    encoding="utf-8",
)
print(f"\nFull report: scripts/_pdf-audit.json")
