"""For every published piece, ensure frontmatter has pdf: "/pdfs/{slug}.pdf"
matching the file that now exists in public/pdfs/."""
import re
import os
from pathlib import Path
from collections import defaultdict

ROOT = Path(r"C:\Users\jedan\jedanderson-site")
CONTENT = ROOT / "src" / "content"
PDFS = ROOT / "public" / "pdfs"

COLLECTIONS = ["essays", "posts", "books", "letters", "papers", "notes", "speeches"]

stats = defaultdict(int)
mismatches = []

FM_RE = re.compile(r"^(---\n)(.*?)(\n---\n)", re.DOTALL)

def upsert_pdf_in_fm(fm_text, slug):
    expected = f'pdf: "/pdfs/{slug}.pdf"'
    # If there's an existing pdf: line, replace it (unless it's already exactly right)
    pdf_re = re.compile(r'^pdf:\s*.*$', re.MULTILINE)
    if pdf_re.search(fm_text):
        new = pdf_re.sub(expected, fm_text, count=1)
        return new, "updated" if new != fm_text else "unchanged"
    # Otherwise, append after license: line if present, else at end
    license_re = re.compile(r'^(license:\s*.*)$', re.MULTILINE)
    if license_re.search(fm_text):
        new = license_re.sub(r"\1\n" + expected, fm_text, count=1)
        return new, "added"
    # else append at end of fm
    return fm_text.rstrip() + "\n" + expected, "added"

for coll in COLLECTIONS:
    coll_dir = CONTENT / coll
    if not coll_dir.exists():
        continue
    for md_path in sorted(coll_dir.glob("*.md")):
        slug = md_path.stem
        text = md_path.read_text(encoding="utf-8")
        m = FM_RE.match(text)
        if not m:
            stats["no_fm"] += 1
            continue
        pre, fm, post = m.group(1), m.group(2), m.group(3)
        # Skip drafts
        if re.search(r'^status:\s*draft', fm, re.MULTILINE):
            stats["draft_skipped"] += 1
            continue
        if not (PDFS / f"{slug}.pdf").exists():
            stats["pdf_missing"] += 1
            mismatches.append((coll, slug, "no pdf file"))
            continue
        new_fm, action = upsert_pdf_in_fm(fm, slug)
        if action == "unchanged":
            stats["already_correct"] += 1
        else:
            new_text = pre + new_fm + post + text[m.end():]
            md_path.write_text(new_text, encoding="utf-8")
            stats[action] += 1

print("=== Frontmatter update stats ===")
for k, v in sorted(stats.items()):
    print(f"  {k}: {v}")
if mismatches:
    print("\n=== Mismatches ===")
    for c, s, why in mismatches[:30]:
        print(f"  {c}/{s}: {why}")
