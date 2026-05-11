"""One-off: extract assets and text from the two staged books.

Sources (read from corpus-ingest/, which is gitignored):
  corpus-ingest/a-victorious-defeat.pdf
  corpus-ingest/we-are-why-it-might.pdf

Outputs:
  public/pdfs/a-victorious-defeat.pdf            (copy)
  public/pdfs/we-are-why-it-might.pdf            (copy)
  public/images/a-victorious-defeat-cover.jpg    (rendered title page, 2x)
  public/images/we-are-why-it-might-cover.jpg    (rendered title page, 2x)
  public/images/we-are-why-it-might/page-NN.{ext}  (24 embedded illustrations
                                                    at full source resolution)
  scripts/_a-victorious-defeat-raw.txt           (per-page text)
  scripts/_we-are-why-it-might-raw.txt           (per-page text, with
                                                    [image: page-NN.ext]
                                                    markers interleaved at
                                                    the page boundaries
                                                    where each image appears)
  scripts/_we-are-why-it-might-images.json       (manifest of image
                                                    extractions: page, xref,
                                                    ext, width, height,
                                                    output filename)

Design notes:
- Cover image uses the same approach as extract-first-defender.py (render
  page 1 at 2x zoom to JPEG q=88) for naming/sizing consistency across the
  corpus.
- The 24 embedded images for We Are Why It Might are extracted with
  doc.extract_image(xref) at native bitmap resolution. We preserve the
  source extension (PNG/JPEG/etc) rather than re-encoding, so the
  Beautiful Version's full image quality survives the pipeline.
- page-NN naming uses zero-padded source page numbers. If a single page
  contains multiple images we suffix with -a/-b/-c so the natural sort
  on the public folder still tracks the source page order.
"""

import fitz  # PyMuPDF
import shutil
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INGEST = ROOT / "corpus-ingest"
PUB_PDFS = ROOT / "public" / "pdfs"
PUB_IMAGES = ROOT / "public" / "images"
SCRIPTS = ROOT / "scripts"

PUB_PDFS.mkdir(parents=True, exist_ok=True)
PUB_IMAGES.mkdir(parents=True, exist_ok=True)


def render_cover(doc, out_path, zoom=2.0):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    mat = fitz.Matrix(zoom, zoom)
    pix = doc[0].get_pixmap(matrix=mat)
    pix.save(str(out_path), jpg_quality=88)
    return pix.width, pix.height


def dump_raw_text(doc, out_path):
    parts = []
    for i, page in enumerate(doc, start=1):
        parts.append(f"\n\n========== PAGE {i} ==========\n\n")
        parts.append(page.get_text("text"))
    out_path.write_text("".join(parts), encoding="utf-8")


def extract_images_per_page(doc, out_dir, slug):
    """Extract every embedded image from every page at native bitmap
    resolution. Returns a manifest list of dicts."""
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest = []
    for page_idx in range(len(doc)):
        page_num = page_idx + 1
        infos = doc.get_page_images(page_idx, full=True)
        # Some pages emit duplicate xrefs (page references vs first
        # occurrence). Deduplicate by xref while preserving order.
        seen = set()
        ordered = []
        for info in infos:
            xref = info[0]
            if xref in seen:
                continue
            seen.add(xref)
            ordered.append(info)
        for k, info in enumerate(ordered):
            xref = info[0]
            img = doc.extract_image(xref)
            ext = img["ext"]
            width = img.get("width")
            height = img.get("height")
            suffix = chr(ord("a") + k) if len(ordered) > 1 else ""
            name = f"page-{page_num:02d}{('-' + suffix) if suffix else ''}.{ext}"
            out_file = out_dir / name
            out_file.write_bytes(img["image"])
            manifest.append({
                "page": page_num,
                "xref": xref,
                "ext": ext,
                "width": width,
                "height": height,
                "file": f"/images/{slug}/{name}",
            })
    return manifest


def dump_raw_text_with_image_markers(doc, out_path, manifest):
    """Per-page text with `[image: /images/.../page-NN.ext]` markers
    inserted at the top of each page's block, in source order. Lets the
    normalization step and any later markdown authoring see exactly
    where illustrations sit relative to text."""
    # group by page
    by_page = {}
    for m in manifest:
        by_page.setdefault(m["page"], []).append(m)
    parts = []
    for i, page in enumerate(doc, start=1):
        parts.append(f"\n\n========== PAGE {i} ==========\n\n")
        for m in by_page.get(i, []):
            parts.append(f"[image: {m['file']}  ({m['width']}x{m['height']} {m['ext']})]\n")
        parts.append(page.get_text("text"))
    out_path.write_text("".join(parts), encoding="utf-8")


def process_avd():
    slug = "a-victorious-defeat"
    src = INGEST / f"{slug}.pdf"
    out_pdf = PUB_PDFS / f"{slug}.pdf"
    out_cover = PUB_IMAGES / f"{slug}-cover.jpg"
    out_raw = SCRIPTS / f"_{slug}-raw.txt"

    shutil.copy2(src, out_pdf)
    doc = fitz.open(src)
    cw, ch = render_cover(doc, out_cover)
    dump_raw_text(doc, out_raw)
    print(f"[{slug}]")
    print(f"  pages: {len(doc)}")
    print(f"  pdf:   {out_pdf.relative_to(ROOT)}")
    print(f"  cover: {out_cover.relative_to(ROOT)}  ({cw}x{ch})")
    print(f"  raw:   {out_raw.relative_to(ROOT)}")
    doc.close()


def process_wawim():
    slug = "we-are-why-it-might"
    src = INGEST / f"{slug}.pdf"
    out_pdf = PUB_PDFS / f"{slug}.pdf"
    out_cover = PUB_IMAGES / f"{slug}-cover.jpg"
    out_img_dir = PUB_IMAGES / slug
    out_raw = SCRIPTS / f"_{slug}-raw.txt"
    out_manifest = SCRIPTS / f"_{slug}-images.json"

    shutil.copy2(src, out_pdf)
    doc = fitz.open(src)
    cw, ch = render_cover(doc, out_cover)
    manifest = extract_images_per_page(doc, out_img_dir, slug)
    dump_raw_text_with_image_markers(doc, out_raw, manifest)
    out_manifest.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"[{slug}]")
    print(f"  pages: {len(doc)}")
    print(f"  pdf:   {out_pdf.relative_to(ROOT)}")
    print(f"  cover: {out_cover.relative_to(ROOT)}  ({cw}x{ch})")
    print(f"  images:{len(manifest)} extracted to {out_img_dir.relative_to(ROOT)}")
    print(f"  raw:   {out_raw.relative_to(ROOT)}")
    print(f"  manifest: {out_manifest.relative_to(ROOT)}")
    doc.close()


if __name__ == "__main__":
    process_avd()
    process_wawim()
