#!/usr/bin/env python
"""Simplicity gate for the plain-language feature.

Checks: banned-word hits, mean sentence length, long-sentence list,
word count, and paragraph-level breath test.

Run: python scripts/simplicity-check.py src/content/essays/the-daylight.md
"""

import io
import re
import sys
import statistics

BANNED = [
    "proxy", "proxies", "optimizer", "optimiser", "optimization", "optimisation",
    "optimizing", "optimising", "control loop", "feedback loop", "phase margin",
    "latency", "dead time", "thermodynamic", "entropy", "landauer", "goodhart",
    "reward hacking", "specification gaming", "alignment", "epistemic",
    "isomorphic", "corpus", "instantiation", "non-proxiable", "interlock",
    "annunciation", "framework", "paradigm", "leverage", "asymmetry",
]

path = sys.argv[1] if len(sys.argv) > 1 else "src/content/essays/the-daylight.md"
raw = io.open(path, encoding="utf-8").read()

# strip frontmatter
body = re.sub(r"^---\s*\n.*?\n---\s*\n", "", raw, count=1, flags=re.S)
# strip the sources endnote (its own paragraph, italic, at the end)
main = body.split("*Sources.")[0]
# strip images, hrs, italic byline/disclosure lines
main = re.sub(r"^!\[.*$", "", main, flags=re.M)
main = re.sub(r"^---\s*$", "", main, flags=re.M)

prose = "\n".join(
    ln for ln in main.split("\n")
    if not ln.strip().startswith("*Jed Anderson")
    and not ln.strip().startswith("*A disclosure")
)

# ---------------- banned words
print("=== 1. BANNED WORDS ===")
low = prose.lower()
hits = []
for w in BANNED:
    for m in re.finditer(r"\b" + re.escape(w), low):
        ctx = prose[max(0, m.start() - 45): m.start() + 45].replace("\n", " ")
        hits.append((w, ctx))
if hits:
    for w, ctx in hits:
        print(f"  HIT  {w!r}: ...{ctx}...")
else:
    print("  0 hits. PASS")

# ---------------- sentence length
clean = re.sub(r"[*_`]", "", prose)
clean = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", clean)
sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", clean) if s.strip()]
lengths = [len(re.findall(r"[A-Za-z0-9']+", s)) for s in sentences]
lengths = [n for n in lengths if n > 0]

print("\n=== 2. SENTENCE LENGTH ===")
print(f"  sentences: {len(lengths)}")
print(f"  total words: {sum(lengths)}")
print(f"  mean: {statistics.mean(lengths):.2f}   (gate: < 15.00)")
print(f"  median: {statistics.median(lengths)}")
print(f"  stdev: {statistics.pstdev(lengths):.2f}")
print(f"  shortest: {min(lengths)}   longest: {max(lengths)}")
print(f"  under 8 words: {sum(1 for n in lengths if n < 8)}")
print("  VERDICT:", "PASS" if statistics.mean(lengths) < 15 else "FAIL")

print("\n  sentences over 30 words (breath test):")
long_ones = [(n, s) for n, s in zip(lengths, sentences) if n > 30]
if not long_ones:
    print("    none")
for n, s in long_ones:
    print(f"    [{n}] {s[:150]}")

# ---------------- paragraphs
paras = [p for p in re.split(r"\n\s*\n", prose) if p.strip()]
pw = [len(re.findall(r"[A-Za-z0-9']+", p)) for p in paras]
print(f"\n=== 3. PARAGRAPHS ===")
print(f"  count: {len(paras)}   mean words: {statistics.mean(pw):.1f}   longest: {max(pw)}")
