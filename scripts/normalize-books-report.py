"""Read-only diagnostic on extracted raw text for the two books.

Produces a punctuation / character-set audit before any markdown is
written. The goal is to catch:
  - U+FFFD replacement characters and ambiguous mojibake
  - Em-dashes that are spaced (project convention: unspaced word—word)
  - Smart-quote balance
  - Any non-ASCII character that warrants editorial review

No substitutions are made. Output is a human-readable report.
"""

import re
import sys
import io
from collections import Counter
from pathlib import Path

# Force UTF-8 on stdout — Windows console defaults to cp1252 and chokes
# on em-dashes, smart quotes, and check-mark glyphs.
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", line_buffering=True)

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"

BOOKS = [
    ("A Victorious Defeat", SCRIPTS / "_a-victorious-defeat-raw.txt"),
    ("We Are Why It Might", SCRIPTS / "_we-are-why-it-might-raw.txt"),
]

# Characters considered "safe" — anything else gets surfaced.
# Includes the unspaced em-dash, en-dash, smart quotes, ellipsis,
# common ligatures, and curly apostrophe. Greek letters, math symbols,
# diacritics, and the replacement character all fall outside this set
# and will be flagged.
SAFE_NON_ASCII = set("—–‘’“”… «»½"
                     "àáèéêëïôöûü"
                     "Éçñ™®©°")
EMDASH = "—"
ENDASH = "–"
LSQ, RSQ = "‘", "’"
LDQ, RDQ = "“", "”"
REPL = "�"


def find_context(text, idx, window=80):
    start = max(0, idx - window)
    end = min(len(text), idx + window + 1)
    s = text[start:end].replace("\n", " / ")
    # mark the offending char with [[X]]
    rel = idx - start
    return s[:rel] + "[[" + text[idx] + "]]" + s[rel + 1:]


def audit(name, path):
    text = path.read_text(encoding="utf-8")
    chars = Counter(text)

    print(f"\n{'='*72}")
    print(f"  {name}  ({path.name})")
    print(f"{'='*72}")
    print(f"total chars: {len(text):,}")
    print(f"unique chars: {len(chars):,}")

    # 1. Replacement-character hits
    repl_positions = [i for i, c in enumerate(text) if c == REPL]
    print(f"\n[1] U+FFFD replacement characters: {len(repl_positions)}")
    if repl_positions:
        for i, pos in enumerate(repl_positions, 1):
            print(f"    #{i} pos {pos}:")
            print(f"        {find_context(text, pos, 90)!r}")
    else:
        print("    none.")

    # 2. Em-dash audit
    em_positions = [i for i, c in enumerate(text) if c == EMDASH]
    print(f"\n[2] Em-dashes (U+2014): {len(em_positions)}")
    spaced = []
    for pos in em_positions:
        before = text[pos - 1] if pos > 0 else ""
        after = text[pos + 1] if pos + 1 < len(text) else ""
        if before == " " or after == " ":
            spaced.append(pos)
    print(f"    spaced (need fix per project convention): {len(spaced)}")
    if spaced:
        for i, pos in enumerate(spaced[:10], 1):
            print(f"      sample #{i}: {find_context(text, pos, 60)!r}")
        if len(spaced) > 10:
            print(f"      ... and {len(spaced) - 10} more")

    # 3. Hyphen-runs that look like em-dashes (-- or ---)
    hyphen_runs = re.findall(r"-{2,}", text)
    print(f"\n[3] Multi-hyphen runs (potential dashes pre-conversion): "
          f"{len(hyphen_runs)} occurrences, {len(set(hyphen_runs))} distinct lengths")
    if hyphen_runs:
        sample_idx = text.find(hyphen_runs[0])
        if sample_idx >= 0:
            print(f"    sample: {find_context(text, sample_idx, 60)!r}")

    # 4. Smart-quote balance
    lsq_n = chars.get(LSQ, 0)
    rsq_n = chars.get(RSQ, 0)
    ldq_n = chars.get(LDQ, 0)
    rdq_n = chars.get(RDQ, 0)
    asc_apo = chars.get("'", 0)
    asc_dq = chars.get('"', 0)
    print(f"\n[4] Quote inventory:")
    print(f"    smart single: open {lsq_n}, close {rsq_n}  ({'BALANCED' if lsq_n == rsq_n else 'IMBALANCED — but apostrophes use U+2019 too, so close > open is expected'})")
    print(f"    smart double: open {ldq_n}, close {rdq_n}  ({'BALANCED' if ldq_n == rdq_n else 'IMBALANCED'})")
    print(f"    ASCII apostrophe ('): {asc_apo}")
    print(f"    ASCII double quote (\"): {asc_dq}")

    # 5. Full non-ASCII inventory with counts
    non_ascii = {c: n for c, n in chars.items() if ord(c) > 127}
    print(f"\n[5] Non-ASCII inventory ({len(non_ascii)} distinct):")
    if non_ascii:
        sorted_na = sorted(non_ascii.items(), key=lambda kv: -kv[1])
        for c, n in sorted_na:
            marker = "  ok" if c in SAFE_NON_ASCII else "  FLAG"
            label = {
                EMDASH: "EM DASH",
                ENDASH: "EN DASH",
                LSQ: "LEFT SINGLE QUOTE",
                RSQ: "RIGHT SINGLE QUOTE / APOSTROPHE",
                LDQ: "LEFT DOUBLE QUOTE",
                RDQ: "RIGHT DOUBLE QUOTE",
                "…": "HORIZONTAL ELLIPSIS",
                " ": "NO-BREAK SPACE",
                REPL: "REPLACEMENT CHARACTER",
            }.get(c, "")
            print(f"    U+{ord(c):04X} {c!r}  count={n}{marker}  {label}")
    else:
        print("    none.")

    # 6. Flagged-character context snippets (anything not in SAFE_NON_ASCII and not ASCII)
    flagged = {c for c in non_ascii if c not in SAFE_NON_ASCII}
    if flagged:
        print(f"\n[6] Flagged-character context (first 3 per char):")
        for fc in sorted(flagged, key=lambda x: ord(x)):
            positions = [i for i, c in enumerate(text) if c == fc][:3]
            print(f"    U+{ord(fc):04X} {fc!r}:")
            for pos in positions:
                print(f"        {find_context(text, pos, 80)!r}")

    return {
        "name": name,
        "replacement_chars": len(repl_positions),
        "em_dashes": len(em_positions),
        "spaced_em_dashes": len(spaced),
        "flagged_non_ascii": sorted({c for c in non_ascii if c not in SAFE_NON_ASCII}),
        "quote_balance_double": ldq_n == rdq_n,
    }


def main():
    summary = []
    for name, path in BOOKS:
        if not path.exists():
            print(f"\n[!] {name}: raw text not found at {path}")
            continue
        summary.append(audit(name, path))

    print(f"\n\n{'='*72}")
    print("  SUMMARY")
    print(f"{'='*72}")
    for s in summary:
        verdict = "CLEAN" if (
            s["replacement_chars"] == 0 and
            s["spaced_em_dashes"] == 0 and
            not s["flagged_non_ascii"] and
            s["quote_balance_double"]
        ) else "NEEDS REVIEW"
        print(f"  {s['name']}: {verdict}")
        print(f"    replacement chars (U+FFFD): {s['replacement_chars']}")
        print(f"    em-dashes total: {s['em_dashes']} "
              f"(spaced: {s['spaced_em_dashes']})")
        print(f"    double-quote balance: {'ok' if s['quote_balance_double'] else 'IMBALANCED'}")
        if s["flagged_non_ascii"]:
            print(f"    flagged non-ASCII: " + ", ".join(
                f"U+{ord(c):04X}({c!r})" for c in s["flagged_non_ascii"]))


if __name__ == "__main__":
    main()
