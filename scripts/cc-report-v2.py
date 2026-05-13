"""Build CC_INGESTION_REPORT_V2.md from the rebuilt corpus.

Key new metric vs V1: image-references-in-markdown (separate from images-on-disk).
That counts how many `![](/images/posts/{slug}/...)` references survived
markdownify. V1 always had 0 because layout-tables killed them; V2 should
have thousands.
"""
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

REPO = Path("C:/Users/jedan/jedanderson-site/.claude/worktrees/priceless-brahmagupta-c9bad3")
POSTS_DIR = REPO / "src/content/posts"
IMAGES_BASE = REPO / "public/images/posts"
REPORT = REPO / "docs/CC_INGESTION_REPORT_V2.md"


def parse_fm_body(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    return (m.group(1), m.group(2)) if m else ("", text)


def word_count(body):
    stripped = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", body)
    stripped = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", stripped)
    return len(re.findall(r"\b\w+\b", stripped))


records = []
for p in sorted(POSTS_DIR.glob("*.md")):
    text = p.read_text(encoding="utf-8")
    fm, body = parse_fm_body(text)
    if "constant-contact-archive" not in fm:
        continue
    slug = p.stem
    title_m = re.search(r'^title:\s*"((?:[^"\\]|\\.)*)"', fm, re.M)
    date_m = re.search(r"^date:\s*(\S+)", fm, re.M)
    status_m = re.search(r"^status:\s*(\w+)", fm, re.M)
    qreason_m = re.search(r'^quarantine_reason:\s*"([^"]*)"', fm, re.M)
    title = title_m.group(1) if title_m else slug
    title = title.replace('\\"', '"').replace("\\\\", "\\")
    wc = word_count(body)
    md_image_refs = len(re.findall(r"!\[[^\]]*\]\(/images/posts/", body))
    # Image files on disk
    img_dir = IMAGES_BASE / slug
    on_disk = 0
    if img_dir.exists():
        on_disk = sum(1 for f in img_dir.iterdir() if f.is_file())
    records.append({
        "slug": slug,
        "title": title,
        "date": date_m.group(1) if date_m else "",
        "status": status_m.group(1) if status_m else "?",
        "qreason": qreason_m.group(1) if qreason_m else None,
        "word_count": wc,
        "md_image_refs": md_image_refs,
        "on_disk_images": on_disk,
    })

pub = [r for r in records if r["status"] == "published"]
draft = [r for r in records if r["status"] != "published"]

# Quarantine reason breakdown
qr_counter = Counter()
for r in draft:
    bucket = (r["qreason"] or "unspecified").split(":", 1)[0]
    qr_counter[bucket] += 1

# Total images
total_md_refs = sum(r["md_image_refs"] for r in records)
total_on_disk = sum(r["on_disk_images"] for r in records)

# Image-localization success rate
posts_with_imgs_on_disk = [r for r in records if r["on_disk_images"] > 0]
posts_with_md_imgrefs = [r for r in records if r["md_image_refs"] > 0]

# Word count distribution for published
wc_buckets = Counter()
for r in pub:
    if r["word_count"] < 50:
        wc_buckets["<50"] += 1
    elif r["word_count"] < 100:
        wc_buckets["50-99"] += 1
    elif r["word_count"] < 250:
        wc_buckets["100-249"] += 1
    elif r["word_count"] < 1000:
        wc_buckets["250-999"] += 1
    elif r["word_count"] < 5000:
        wc_buckets["1000-4999"] += 1
    else:
        wc_buckets["5000+"] += 1

# Date range
dates_all = [r["date"] for r in records if r["date"]]
earliest = min(dates_all) if dates_all else "—"
latest = max(dates_all) if dates_all else "—"

# Failure-pattern probes
posts_with_entities = []
posts_with_table_skel = []
for r in records:
    p = POSTS_DIR / f"{r['slug']}.md"
    text = p.read_text(encoding="utf-8")
    _, body = parse_fm_body(text)
    if re.search(r"&(amp|quot|nbsp|ndash|mdash|lt|gt|#39|hellip);", body):
        posts_with_entities.append(r["slug"])
    if re.search(r"\|\s*-+\s*\|", body):
        posts_with_table_skel.append(r["slug"])

lines = [
    "# Constant Contact Ingestion Report (V2 — Rebuild)",
    "",
    f"Generated: {datetime.now().isoformat(timespec='seconds')}",
    "",
    "This report covers the **rebuild** that followed `docs/CC_DIAGNOSTIC.md`. ",
    "V1 published 544 posts with HTML-entity-leaking slugs, zero markdown image refs, ",
    "and bodies dominated by `| | | --- | --- |` table skeleton. V2 patches the ",
    "extractor with table-flattening, entity-decode, and background-image harvest.",
    "",
    "## Summary",
    "",
    f"- Total CC archive posts: **{len(records)}**",
    f"  - Published: **{len(pub)}**",
    f"  - Drafts (quarantined): **{len(draft)}**",
    f"- Date range: {earliest} → {latest}",
    "",
    "## Quarantine reasons",
    "",
    "| reason bucket | count |",
    "|---------------|-------|",
]
for k, v in qr_counter.most_common():
    lines.append(f"| {k} | {v} |")

lines += [
    "",
    "## Image-localization success (the key V2 metric)",
    "",
    "V1 had 16K image files on disk but **zero** `![]()` references in markdown bodies. ",
    "V2 should now have references that match disk files.",
    "",
    f"- Total image files on disk: **{total_on_disk}**",
    f"- Total `![]()` references in markdown bodies: **{total_md_refs}**",
    f"- Posts with at least one image file on disk: **{len(posts_with_imgs_on_disk)}**",
    f"- Posts with at least one markdown image ref: **{len(posts_with_md_imgrefs)}**",
    f"- Ratio (md-refs / on-disk-files): **{(total_md_refs / total_on_disk * 100):.1f}%**" if total_on_disk else "",
    "",
    "## Failure-pattern probes",
    "",
    "These should all be zero or near-zero after V2:",
    "",
    f"- Posts containing HTML entities (`&amp;`, `&quot;`, etc.): **{len(posts_with_entities)}**",
    f"- Posts containing pipe-table skeleton (`| --- |`): **{len(posts_with_table_skel)}**",
    "",
]
if posts_with_entities:
    lines.append("### Posts with surviving entities (first 10)")
    lines.append("")
    for slug in posts_with_entities[:10]:
        lines.append(f"- `{slug}`")
    lines.append("")
if posts_with_table_skel:
    lines.append("### Posts with surviving table skeleton (first 10)")
    lines.append("")
    for slug in posts_with_table_skel[:10]:
        lines.append(f"- `{slug}`")
    lines.append("")

lines += [
    "## Published-post word-count distribution",
    "",
    "| bucket | count |",
    "|--------|-------|",
]
for k in ["<50", "50-99", "100-249", "250-999", "1000-4999", "5000+"]:
    lines.append(f"| {k} | {wc_buckets.get(k, 0)} |")

lines += [
    "",
    "## Top 25 longest published posts",
    "",
    "| date | title | slug | words | md image refs | files on disk |",
    "|------|-------|------|-------|---------------|---------------|",
]
top = sorted(pub, key=lambda r: -r["word_count"])[:25]
for r in top:
    title = r["title"].replace("|", "\\|")[:80]
    lines.append(f"| {r['date']} | {title} | `{r['slug']}` | {r['word_count']} | {r['md_image_refs']} | {r['on_disk_images']} |")

lines += [
    "",
    "## Top 25 published posts by image count",
    "",
    "| date | title | slug | words | md image refs | files on disk |",
    "|------|-------|------|-------|---------------|---------------|",
]
top_img = sorted(pub, key=lambda r: -r["md_image_refs"])[:25]
for r in top_img:
    title = r["title"].replace("|", "\\|")[:80]
    lines.append(f"| {r['date']} | {title} | `{r['slug']}` | {r['word_count']} | {r['md_image_refs']} | {r['on_disk_images']} |")

REPORT.parent.mkdir(parents=True, exist_ok=True)
REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
print(f"Wrote {REPORT}")
print(f"Total CC posts: {len(records)}; published: {len(pub)}; drafts: {len(draft)}")
print(f"Total md image refs: {total_md_refs}; on-disk: {total_on_disk}")
print(f"Entity failures: {len(posts_with_entities)}; table-skel failures: {len(posts_with_table_skel)}")
