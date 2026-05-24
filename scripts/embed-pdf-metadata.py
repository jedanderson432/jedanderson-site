"""
Embed schema.org-style metadata into published PDF artifacts.

Idempotent. Each entry in METADATA describes the canonical Title,
Author, Subject, Keywords, and Creator for one PDF in /public/pdfs/.
Re-running the script will overwrite the existing values with the
canonical ones — safe to invoke repeatedly after PDF regeneration.

Usage:
    python scripts/embed-pdf-metadata.py            # all entries
    python scripts/embed-pdf-metadata.py SLUG ...   # subset by slug

Requires PyMuPDF (`pip install pymupdf`).
"""

from __future__ import annotations

import sys
from pathlib import Path

import fitz  # PyMuPDF

REPO_ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = REPO_ROOT / "public" / "pdfs"


# Slug → metadata. Slug must match the filename stem at /public/pdfs/{slug}.pdf.
# Add new entries here as essays gain canonical-citation grade.
METADATA: dict[str, dict[str, str]] = {
    "bond-bit-ratio": {
        "title": "The Bond-Bit Ratio",
        "author": "Jed Anderson",
        "subject": "A derivation of why information is at least 240× cheaper than force",
        "keywords": (
            "Landauer, bond-bit asymmetry, information physics, "
            "environmental superintelligence, thermodynamics, 240x"
        ),
        "creator": "jedanderson.org",
    },
}


def embed(slug: str, fields: dict[str, str]) -> tuple[str, str]:
    """Embed the given metadata into /public/pdfs/{slug}.pdf in place.

    Returns (slug, status) where status is one of:
      - "updated" — fields written
      - "unchanged" — fields already matched the canonical values
      - "missing" — no file at /public/pdfs/{slug}.pdf
      - "error: ..." — exception during write
    """
    pdf_path = PDF_DIR / f"{slug}.pdf"
    if not pdf_path.exists():
        return slug, "missing"

    try:
        doc = fitz.open(pdf_path)
    except Exception as exc:  # noqa: BLE001
        return slug, f"error: open failed ({exc})"

    try:
        current = doc.metadata or {}
        desired = {
            "title": fields["title"],
            "author": fields["author"],
            "subject": fields["subject"],
            "keywords": fields["keywords"],
            "creator": fields["creator"],
        }

        # Idempotent check — skip the rewrite if every field already matches.
        if all(current.get(k) == v for k, v in desired.items()):
            doc.close()
            return slug, "unchanged"

        # set_metadata replaces the whole metadata dict; preserve any
        # producer field set by Playwright/Chromium during PDF render.
        merged = {**current, **desired}
        doc.set_metadata(merged)
        doc.saveIncr()
        doc.close()
        return slug, "updated"
    except Exception as exc:  # noqa: BLE001
        try:
            doc.close()
        except Exception:
            pass
        return slug, f"error: write failed ({exc})"


def main(argv: list[str]) -> int:
    selected: list[str]
    if len(argv) > 1:
        selected = argv[1:]
        unknown = [s for s in selected if s not in METADATA]
        if unknown:
            print(
                f"Unknown slug(s): {', '.join(unknown)}. "
                f"Known: {', '.join(sorted(METADATA))}",
                file=sys.stderr,
            )
            return 2
    else:
        selected = sorted(METADATA)

    if not PDF_DIR.is_dir():
        print(f"PDF directory not found: {PDF_DIR}", file=sys.stderr)
        return 1

    results: list[tuple[str, str]] = []
    for slug in selected:
        results.append(embed(slug, METADATA[slug]))

    width = max(len(s) for s, _ in results) if results else 0
    for slug, status in results:
        print(f"  {slug.ljust(width)}  {status}")

    if any(s.startswith("error:") for _, s in results):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
