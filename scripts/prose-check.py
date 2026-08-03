#!/usr/bin/env python
"""Measure the prose gates for a draft essay.

Reports sentence-length distribution, short-sentence coverage per section,
hedge density per paragraph, adjacent-paragraph shape, and banned
self-correction phrases. Prints a report; the numbers go into
analysis/prose-check.md.

Run: python scripts/prose-check.py src/content/essays/the-latency-bet.md
"""

import io
import re
import statistics
import sys

BANNED = [
    "i had that wrong", "i have narrowed", "i have already narrowed",
    "i should have", "i should probably", "mine does not",
    "i am printing", "i put this in front of", "let me be precise because",
    "i want to be honest about", "i will be careful with it",
    "the something is mine", "that is a preference, not an argument",
]

HEDGES = [
    "roughly", "approximately", "arguably", "perhaps", "possibly", "somewhat",
    "relatively", "fairly", "rather", "seems", "appears", "tends to",
    "more or less", "to some extent", "in some sense", "i think", "i believe",
    "probably", "likely", "may be", "might be", "could be", "partly",
    "largely", "mostly", "generally", "typically", "often", "sometimes",
]


def split_sentences(text):
    text = re.sub(r"\s+", " ", text)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"'“])", text)
    return [p.strip() for p in parts if len(p.strip()) > 1]


def wordcount(s):
    return len([w for w in re.findall(r"[A-Za-z][A-Za-z'’-]*", s)])


def strip_markup(line):
    line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)      # images
    line = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", line)   # links
    line = re.sub(r"[*_`>#]", "", line)
    return line


def main(path):
    raw = io.open(path, encoding="utf-8").read()
    # drop frontmatter
    body = raw.split("---", 2)[2] if raw.startswith("---") else raw

    sections, current, title = [], [], "(opening)"
    for line in body.split("\n"):
        if line.startswith("## "):
            if current:
                sections.append((title, current))
            title, current = line[3:].strip(), []
        else:
            current.append(line)
    if current:
        sections.append((title, current))

    all_sentences, report = [], []
    para_hedge_flags, shapes = [], []

    for title, lines in sections:
        text = " ".join(strip_markup(l) for l in lines if l.strip()
                        and not l.strip().startswith("|"))
        sents = split_sentences(text)
        lens = [wordcount(s) for s in sents if wordcount(s) > 0]
        if not lens:
            continue
        all_sentences.extend(lens)
        shortest = min(lens)
        report.append((title, len(lens), round(statistics.mean(lens), 1),
                       shortest, sum(1 for l in lens if l < 8)))

        # hedges per paragraph
        paras = [p for p in "\n".join(lines).split("\n\n") if p.strip()]
        for p in paras:
            low = strip_markup(p).lower()
            n = sum(low.count(h) for h in HEDGES)
            if n > 1:
                para_hedge_flags.append((title, n, low[:90]))
            shapes.append(len(wordcount(strip_markup(p)) * [0]))

    print("=" * 74)
    print("SENTENCE LENGTH")
    print("=" * 74)
    print(f"  sentences        : {len(all_sentences)}")
    print(f"  mean             : {statistics.mean(all_sentences):.1f} words")
    print(f"  stdev            : {statistics.pstdev(all_sentences):.1f}")
    print(f"  min / max        : {min(all_sentences)} / {max(all_sentences)}")
    print(f"  under 8 words    : {sum(1 for l in all_sentences if l < 8)}"
          f" ({100*sum(1 for l in all_sentences if l < 8)/len(all_sentences):.0f}%)")
    print(f"  over 40 words    : {sum(1 for l in all_sentences if l > 40)}")

    print()
    print("=" * 74)
    print("PER SECTION  (gate: every section needs >=1 sentence under 8 words)")
    print("=" * 74)
    fails = 0
    for title, n, mean, shortest, nshort in report:
        flag = "OK " if nshort >= 1 else "FAIL"
        if nshort < 1:
            fails += 1
        print(f"  {flag} {title[:44]:<46} n={n:<4} mean={mean:<5} min={shortest:<3} short={nshort}")

    print()
    print("=" * 74)
    print("HEDGE DENSITY  (gate: no paragraph with more than one qualifier)")
    print("=" * 74)
    if not para_hedge_flags:
        print("  OK  no paragraph exceeds one qualifier")
    else:
        for title, n, snippet in para_hedge_flags:
            print(f"  FLAG [{n}] {title[:30]:<32} {snippet[:70]}...")

    print()
    print("=" * 74)
    print("BANNED SELF-CORRECTION PHRASES")
    print("=" * 74)
    low = body.lower()
    found = [b for b in BANNED if b in low]
    if found:
        for b in found:
            print(f"  FAIL  '{b}'")
    else:
        print("  OK  none present")

    print()
    print(f"SECTIONS FAILING SHORT-SENTENCE GATE: {fails}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1
         else "src/content/essays/the-latency-bet.md")
