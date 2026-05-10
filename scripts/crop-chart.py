"""Crop just the 'Historical Growth in Human Technology' chart out of
page 3 of The-First-Defender.pdf, in proper proportions."""

import fitz
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_PDF = ROOT / "The-First-Defender.pdf"
OUT = ROOT / "public" / "images" / "the-first-defender-tech-growth.png"

doc = fitz.open(SRC_PDF)
page = doc[2]  # page 3

# Page dimensions in PDF points
print(f"Page rect: {page.rect}")

# Target the chart region. Page 3 layout (top to bottom):
#   - Section header "I. The most important graph ever drawn"
#   - Chart with title "Historical Growth in Human Technology"
#   - Italic caption
#   - Body paragraphs
#
# We want just the chart (title + plot area). Italic caption goes into
# markdown text below the image. Coordinates determined by visual
# inspection of the rendered full page.
clip = fitz.Rect(50, 112, 555, 322)  # x0, y0, x1, y1 in PDF points

# Render at 3x for crispness on retina screens
mat = fitz.Matrix(3.0, 3.0)
pix = page.get_pixmap(matrix=mat, clip=clip)
pix.save(str(OUT))
print(f"Wrote {OUT}  ({pix.width}x{pix.height})")
