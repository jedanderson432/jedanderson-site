#!/usr/bin/env python
"""Render draft essays to standalone HTML for PDF printing.

Draft pieces are deliberately excluded from `dist`, so the repo's normal
Playwright-over-dist PDF pipeline cannot see them. This renders the canonical
markdown directly, using the site's serif stack, and writes HTML that
scripts/print-draft-pdfs.mjs turns into PDFs.

Typography note: the brief specified Lora. No Lora face is present on this
machine or in the repo, and nothing was downloaded to add one, so this uses the
site's canonical serif stack (Iowan Old Style / Palatino / Georgia) — which is
what every other PDF in the corpus already uses. Deviation is intentional and
recorded in the run report.

Run: python scripts/make-draft-pdfs.py
"""

import os
import re

from markdown_it import MarkdownIt

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, ".."))
OUT = os.path.join(REPO, "scripts", "_draft-pdf-html")
os.makedirs(OUT, exist_ok=True)

PIECES = [
    ("the-latency-bet", "essays"),
    ("environmental-safety-mode", "essays"),
]

CSS = """
@page { size: A4; margin: 20mm 18mm 22mm 18mm; }
* { box-sizing: border-box; }
body {
  font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif;
  font-size: 10.6pt; line-height: 1.62; color: #1a1a1a; margin: 0;
  -webkit-font-smoothing: antialiased;
}
.masthead { border-bottom: 1.5pt solid #1a1a1a; padding-bottom: 10pt; margin-bottom: 22pt; }
.eyebrow { font-size: 7.6pt; letter-spacing: .16em; text-transform: uppercase; color: #6e6e6e; }
h1 { font-size: 23pt; line-height: 1.18; margin: 10pt 0 6pt; font-weight: 700; }
.subtitle { font-size: 11.4pt; line-height: 1.45; color: #4a4a4a; font-style: italic; margin: 0 0 10pt; }
.byline { font-size: 8.8pt; color: #6e6e6e; }
h2 { font-size: 13.6pt; margin: 22pt 0 7pt; font-weight: 700; page-break-after: avoid; }
h3 { font-size: 11.4pt; margin: 16pt 0 5pt; font-weight: 700; page-break-after: avoid; }
p { margin: 0 0 9pt; orphans: 3; widows: 3; }
a { color: #0072B2; text-decoration: none; }
strong { font-weight: 700; }
ul, ol { margin: 0 0 10pt; padding-left: 17pt; }
li { margin-bottom: 4pt; }
blockquote {
  margin: 12pt 0; padding: 2pt 0 2pt 14pt;
  border-left: 2pt solid #D55E00; color: #333; font-style: italic;
}
img { max-width: 100%; height: auto; display: block; margin: 14pt auto 6pt; page-break-inside: avoid; }
hr { border: 0; border-top: .6pt solid #cfcfcf; margin: 18pt 0; }
table { border-collapse: collapse; width: 100%; margin: 12pt 0; font-size: 8.8pt; page-break-inside: avoid; }
th, td { border: .6pt solid #cfcfcf; padding: 4pt 6pt; text-align: left; vertical-align: top; }
th { background: #f4f4f4; font-weight: 700; }
code { font-family: Consolas, 'Courier New', monospace; font-size: 9pt; background: #f4f4f4; padding: 0 2pt; }
.callout {
  border: 1pt solid #D55E00; background: #fdf7f2;
  padding: 12pt 14pt 4pt; margin: 16pt 0; page-break-inside: avoid;
}
.callout p { font-size: 10pt; }
.footer-note { margin-top: 22pt; padding-top: 8pt; border-top: .6pt solid #cfcfcf; font-size: 8.4pt; color: #6e6e6e; }
"""

FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)


def frontmatter(text):
    m = FM.match(text)
    if not m:
        return {}, text
    raw, body = m.group(1), text[m.end():]
    data = {}
    for line in raw.split("\n"):
        if ":" in line and not line.startswith((" ", "-", "\t")):
            k, v = line.split(":", 1)
            data[k.strip()] = v.strip().strip('"').strip("'")
    return data, body


def render(slug, collection):
    src = os.path.join(REPO, "src", "content", collection, slug + ".md")
    with open(src, encoding="utf-8") as fh:
        fm, body = frontmatter(fh.read())

    # point image srcs at the on-disk files so Playwright can load them
    body = body.replace("](/images/", "](" + os.path.join(REPO, "public", "images").replace("\\", "/") + "/")

    md = MarkdownIt("commonmark", {"html": True}).enable("table").enable("strikethrough")
    html_body = md.render(body)

    doc = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>{fm.get('title','')}</title>
<style>{CSS}</style></head>
<body>
<div class="masthead">
  <div class="eyebrow">jedanderson.org &middot; draft &middot; CC-BY-4.0</div>
  <h1>{fm.get('title','')}</h1>
  <div class="subtitle">{fm.get('subtitle','')}</div>
  <div class="byline">Jed Anderson &middot; Independent Researcher, Houston, Texas &middot;
    ORCID 0009-0003-1807-2459 &middot; {fm.get('date','')}</div>
</div>
{html_body}
<div class="footer-note">
  Canonical: https://jedanderson.org/essays/{slug} &middot; Status: draft &middot;
  Licensed CC-BY-4.0. Generated from the canonical markdown.
</div>
</body></html>"""

    out = os.path.join(OUT, slug + ".html")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(doc)
    print("wrote", out)
    return out


if __name__ == "__main__":
    for slug, coll in PIECES:
        render(slug, coll)
