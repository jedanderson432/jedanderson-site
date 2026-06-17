# Preprints — canonical LaTeX sources

This folder holds the maintainable source for formal preprints. The `.tex` here is canonical; the built PDF lives at `public/pdfs/{slug}-preprint.pdf`.

## bond-bit-ratio-preprint

- Source: [`bond-bit-ratio-preprint.tex`](bond-bit-ratio-preprint.tex)
- Built artifact: `public/pdfs/bond-bit-ratio-preprint.pdf`
- Build: `pdflatex bond-bit-ratio-preprint.tex` (run twice to resolve references). The `.tex` is the maintainable origin — regenerate the PDF on every revision; never hand-edit the PDF.

This formal preprint is a distinct document from the web-essay render at `public/pdfs/bond-bit-ratio.pdf` (the latter is the page-rendered version already deposited on Zenodo). Do not conflate or overwrite them.
