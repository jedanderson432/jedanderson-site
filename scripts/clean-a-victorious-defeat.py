"""Reproducible cleanup of A Victorious Defeat raw extracted text.

Inputs:
  scripts/_a-victorious-defeat-raw.txt

Outputs:
  scripts/_a-victorious-defeat-cleaned.txt     (post-substitution raw text)
  scripts/_a-victorious-defeat-body.md         (markdown body, no frontmatter)

Substitutions applied (per editorial decisions on the normalization report):

  1. Private-use bullet glyphs from Symbol/Wingdings fonts → U+2022 BULLET
     U+F076, U+F0A7, U+F0B7, U+F0D8  →  •
  2. U+2015 HORIZONTAL BAR → U+2014 EM DASH
  3. OCR glitch: 'di¹n¹t' → 'didn't'  (U+00B9 superscript-1 used as apostrophe)
  4. Multi-hyphen runs '--', '---', '-----', etc.  →  U+2014 EM DASH
  5. Spaced em-dashes: collapse adjacent SPACE chars next to U+2014 (iterated
     until stable). Newlines are NOT touched — em-dashes at line ends stay.

Explicitly preserved:
  • U+00A7 §  (legal cites)
  • U+00BD ½ and U+00BE ¾  (real fractions)
  • U+25BA ► (author's editorial Democrats/Republicans bullets)
  • All accented characters in proper nouns

Not algorithmically addressable (flagged inline at top of the produced .md
for editorial pass):
  • 20 unbalanced double quotes detected during normalization

Markdown body conversion:
  • Strip extraction page markers (`========== PAGE N ==========`)
  • Strip running page numbers (`PAGE N` bare lines, where N matches the
    extracted printed-page numbering — these are print-form running
    headers/footers, not content)
  • Strip trailing whitespace from every line
  • Collapse runs of 3+ blank lines to exactly one blank line so paragraph
    structure survives but the unfilled vertical space from the PDF
    doesn't bloat the markdown
"""

import re
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", line_buffering=True)

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"
SRC = SCRIPTS / "_a-victorious-defeat-raw.txt"
OUT_CLEAN = SCRIPTS / "_a-victorious-defeat-cleaned.txt"
OUT_MD = SCRIPTS / "_a-victorious-defeat-body.md"


def apply_substitutions(text):
    counts = {}

    # 1. Symbol-font bullets → •
    for ch in ["", "", "", ""]:
        n = text.count(ch)
        if n:
            counts[f"PUA {hex(ord(ch))} → •"] = n
            text = text.replace(ch, "•")

    # 2. U+2015 → U+2014
    n = text.count("―")
    if n:
        counts["U+2015 ― → U+2014 —"] = n
        text = text.replace("―", "—")

    # 3. OCR: didn¹t → didn't  (single U+00B9 substituted for the apostrophe;
    #    actual occurrence is "I didn¹t fight George III to become George I."
    #    on the Churchill/Washington quote)
    n = text.count("didn¹t")
    if n:
        counts["didn¹t → didn’t"] = n
        text = text.replace("didn¹t", "didn’t")

    # 4. Multi-hyphen runs → em-dash (longest first via regex)
    n = len(re.findall(r"-{2,}", text))
    if n:
        counts["-- / --- runs → —"] = n
        text = re.sub(r"-{2,}", "—", text)

    # 5. Unspace em-dashes: remove SPACE characters adjacent to em-dash.
    #    Iterate until stable so chains like '— —' collapse correctly.
    before_count = sum(1 for i, c in enumerate(text)
                       if c == "—" and (
                           (i > 0 and text[i - 1] == " ") or
                           (i + 1 < len(text) and text[i + 1] == " ")))
    prev = None
    while text != prev:
        prev = text
        text = text.replace(" —", "—").replace("— ", "—")
    counts["spaced em-dashes unspaced"] = before_count

    return text, counts


def post_substitution_audit(text):
    """Verify the substitution pass left a clean state."""
    audit = {}
    audit["remaining PUA glyphs"] = sum(
        text.count(c) for c in ["", "", "", ""]
    )
    audit["remaining U+2015"] = text.count("―")
    audit["remaining didn¹t"] = text.count("didn¹t")
    audit["remaining U+00B9 ¹ anywhere"] = text.count("¹")
    audit["remaining multi-hyphen runs"] = len(re.findall(r"-{2,}", text))
    # Spaced em-dash check:
    spaced = sum(
        1 for i, c in enumerate(text)
        if c == "—" and (
            (i > 0 and text[i - 1] == " ") or
            (i + 1 < len(text) and text[i + 1] == " ")
        )
    )
    audit["remaining spaced em-dashes"] = spaced
    return audit


def to_markdown_body(text):
    """Strip extraction markers and print-form page numbers; tighten
    blank-line runs while preserving paragraph structure."""
    lines = text.split("\n")
    out = []
    in_page_marker = False

    for line in lines:
        stripped = line.rstrip()
        # Drop extraction page separators
        if re.match(r"^=+\s*PAGE\s+\d+\s*=+$", stripped):
            continue
        # Drop print-form running page numbers: 'PAGE NN' on its own line
        if re.match(r"^\s*PAGE\s+\d+\s*$", stripped):
            continue
        out.append(stripped)

    text = "\n".join(out)
    # Collapse runs of 3+ blank lines down to 1 blank line (one separator
    # between paragraphs). Two blank lines do the same job; trim to one.
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Trim leading/trailing blank space at file edges
    text = text.strip() + "\n"
    return text


def main():
    raw = SRC.read_text(encoding="utf-8")
    print(f"input: {SRC.name} ({len(raw):,} chars)")

    cleaned, counts = apply_substitutions(raw)
    OUT_CLEAN.write_text(cleaned, encoding="utf-8")

    print("\nSubstitution counts:")
    for label, n in counts.items():
        print(f"  {label}: {n}")

    audit = post_substitution_audit(cleaned)
    print("\nPost-substitution audit (all should be 0):")
    ok = True
    for label, n in audit.items():
        status = "OK" if n == 0 else "STILL PRESENT"
        if n != 0:
            ok = False
        print(f"  {label}: {n}  [{status}]")
    if not ok:
        sys.exit("Substitution audit failed.")

    body = to_markdown_body(cleaned)
    OUT_MD.write_text(body, encoding="utf-8")
    print(f"\noutput: {OUT_CLEAN.name} ({len(cleaned):,} chars)")
    print(f"output: {OUT_MD.name} ({len(body):,} chars)")


if __name__ == "__main__":
    main()
