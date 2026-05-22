"""One-shot publish script for bits-protect-its essay."""
import re
import shutil
from pathlib import Path

REPO = Path(r"C:\Users\jedan\jedanderson-site")
INBOX = Path(r"C:\Users\jedan\Documents\corpus-inbox")
ARCHIVE = Path(r"C:\Users\jedan\Documents\corpus-archive")

SLUG = "bits-protect-its"

# --- read prose source ---
src = (INBOX / "essay_prose.md").read_text(encoding="utf-8")

# Strip the source header lines (title + subtitle + divider) — frontmatter carries them
# Source starts with:
# # Bits Protect Its
# ## Why Environmental Superintelligence Is a Physical Necessity
# (blank)
# ---
# (blank)
# <body>
lines = src.splitlines()
# Drop the first H1, H2, blank, ---, blank
# Find first non-empty body line after the leading metadata
body_start = 0
seen_divider = False
for i, ln in enumerate(lines):
    if seen_divider and ln.strip() != "":
        body_start = i
        break
    if ln.strip() == "---":
        seen_divider = True
body = "\n".join(lines[body_start:])

# Normalize: unspaced em-dashes (word—word, never word — word)
body = body.replace(" — ", "—")

# Tighten triple newlines, but keep section dividers
body = re.sub(r"\n{3,}", "\n\n", body)

frontmatter = f"""---
title: "Bits Protect Its"
subtitle: "Why environmental superintelligence is a physical necessity"
slug: "{SLUG}"
date: 2026-05-22
type: essay
status: published
tags: ["cornerstone", "causal-sovereignty", "enviroai", "information-theory", "thermodynamics", "deutsch", "treatise"]
abstract: "The full treatise behind the site's thesis. Walks the planetary regulatory loop (two-to-three-decade NAAQS implementation), the thermodynamics of information (Landauer's bound, the bond-bit asymmetry), the convergence of AI capability and geophysical urgency, and the inversion that follows: environmental law has always been a prosthesis for cognitive limits, and for the first time the organ it was substituting for is being built."
license: CC-BY-4.0
hero_image: "/images/{SLUG}-hero.jpg"
hero_image_alt: "Cover of Bits Protect Its—dark navy background, italic serif title with 'Its' in cyan, gold rule below, subtitle naming environmental superintelligence as a physical necessity, byline J. Anderson, EnviroAI"
interactive_url: "/visual-essays/{SLUG}/"
interactive_cta: "Read the visual essay →"
---

"""

out = REPO / "src" / "content" / "essays" / f"{SLUG}.md"
out.write_text(frontmatter + body, encoding="utf-8")
print(f"Wrote: {out}")

# Copy HTML visual essay to public/visual-essays/{slug}/index.html
vis_dir = REPO / "public" / "visual-essays" / SLUG
vis_dir.mkdir(parents=True, exist_ok=True)
shutil.copy2(INBOX / "bits_protect_its (2).html", vis_dir / "index.html")
print(f"Wrote: {vis_dir / 'index.html'}")
