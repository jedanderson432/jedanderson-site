"""One-off: extract assets and text from The-First-Defender.pdf.

Outputs:
  public/pdfs/the-first-defender.pdf            (copy)
  public/images/the-first-defender-cover.jpg    (rendered page 1)
  public/images/the-first-defender-tech-growth.png (rendered chart on page 3)
  scripts/_first-defender-raw.txt               (extracted text per page,
                                                  fed into a manual cleanup
                                                  pass that produces the
                                                  final markdown)
"""

import fitz  # PyMuPDF
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_PDF = ROOT / "The-First-Defender.pdf"
OUT_PDF = ROOT / "public" / "pdfs" / "the-first-defender.pdf"
OUT_COVER = ROOT / "public" / "images" / "the-first-defender-cover.jpg"
OUT_CHART = ROOT / "public" / "images" / "the-first-defender-tech-growth.png"
OUT_RAW = ROOT / "scripts" / "_first-defender-raw.txt"

# 1. Copy source PDF to public/pdfs/
OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(SRC_PDF, OUT_PDF)
print(f"Copied PDF -> {OUT_PDF}")

# 2. Open
doc = fitz.open(SRC_PDF)
print(f"Pages: {len(doc)}")

# 3. Render page 1 (cover) -> JPEG
#    Use ~2x zoom for retina sharpness while keeping JPEG file size sane.
OUT_COVER.parent.mkdir(parents=True, exist_ok=True)
mat = fitz.Matrix(2.0, 2.0)
pix = doc[0].get_pixmap(matrix=mat)
pix.save(str(OUT_COVER), jpg_quality=88)
print(f"Cover JPEG  -> {OUT_COVER}  ({pix.width}x{pix.height})")

# 4. Render page 3 (chart) -> PNG, full page
mat3 = fitz.Matrix(2.5, 2.5)  # higher zoom for the chart
pix3 = doc[2].get_pixmap(matrix=mat3)
pix3.save(str(OUT_CHART))
print(f"Chart PNG   -> {OUT_CHART}  ({pix3.width}x{pix3.height})")

# 5. Extract text per page for the cleanup pass
parts = []
for i, page in enumerate(doc, start=1):
    parts.append(f"\n\n========== PAGE {i} ==========\n\n")
    parts.append(page.get_text("text"))
OUT_RAW.write_text("".join(parts), encoding="utf-8")
print(f"Raw text    -> {OUT_RAW}")
