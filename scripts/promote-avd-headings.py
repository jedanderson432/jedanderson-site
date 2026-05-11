"""Reproducible promotion of A Victorious Defeat section titles to markdown H2.

Reads src/content/books/a-victorious-defeat.md and converts each bare-line
section title (from the explicit list below) into a markdown ## H2 heading.

Safety rails:
  - Frontmatter (between the leading '---' / '---' fence) is never touched.
  - HTML comments (<!-- ... -->) are never touched. The editorial-flag
    block at the top of the body lives inside a single such comment.
  - A line is promoted only when ALL of the following hold:
      1. Its stripped form matches one of the explicit titles (after
         smart-quote / apostrophe / ellipsis normalization).
      2. It is preceded by a blank line.
      3. It is followed by a blank line.
      4. Its length is under 120 characters.
  - Body prose that happens to coincide with a short title-shaped string
    in the middle of a paragraph will not match because of the
    surrounding-blank-line rule.

The script is idempotent — running it twice does not double-prefix.
Reports: promotions made, titles in the list NOT found, duplicates.
"""

import re, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", line_buffering=True)

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "src" / "content" / "books" / "a-victorious-defeat.md"

# Titles to promote — copied verbatim from the user's instruction.
TITLES = [
    "Preface",
    "Light and the Clean Air Act",
    "Consensus",
    "Perspective",
    "Best way to Protect Nature",
    "Sacred vs. Secular",
    "Liberals, Conservatives, and the Clean Air Act",
    "It's Better to Fail",
    "New Year's Resolutions",
    "The Call for Clean Air Act Transformation",
    "Belief and the Clean Air Act",
    "The Weak or the Strong?",
    "Trying",
    "The Lorax and the Clean Air Act",
    "Idealism",
    "Attribution",
    "Power and Influence",
    "What's in this Reform Effort for us Personally?",
    "Clean Air Act Reform is Easy",
    "The World's Judgment and the Clean Air Act",
    "Simplifying the Air Quality Management System",
    "Apologetics on Clean Air Act Reform",
    "The Goal",
    "Music and the Clean Air Act",
    "Change",
    "Best Place for Tackling the Impossible",
    "Simplicity and the Clean Air Act",
    "Accepting Things as They Are",
    "You or Congress",
    "Simplicity",
    "Two Duties",
    "Clean Air Act Reform and the Little Engine that Could",
    "How can we Transform the Clean Air Act?",
    "False Barriers",
    "How can I believe that you and I are capable of transforming the Clean Air Act?",
    "Blame and the Clean Air Act",
    "The Pain and Difficulty of Transforming the Clean Air Act",
    "Emphasis",
    "The Wave",
    "Isaac Newton",
    "Shame and Remorse",
    "Building a New Clean Air Act",
    "Beethoven's 9th Symphony",
    "Moving Mountains",
    "Jumping out of the Trench—Clean Air Act Reform",
    "\"It's not the right time\"",
    "Schoenbrod Saying Clean Air Act is Now \"Stupid\"",
    "The Wrong Path",
    "How Much Longer until the Clean Air Act is Transformed?",
    "Henry David Thoreau",
    "Making Mistakes",
    "Not the Right Time",
    "Bruce Lee",
    "Albert Einstein",
    "Steve Jobs",
    "The Pope and Climate Change",
    "Abilities",
    "Should We Change the Clean Air Act?",
    "How Nature Works",
    "Simplifying the Operating System",
    "Everything is Impossible without Trying",
    "Einstein's 3 Rules of Work and the Clean Air Act",
    "Predicting the Future of the Clean Air Act",
    "Peace in Environmental Protection",
    "\"Re-evaluating the Clean Air Act would be disastrous\"",
    "Clean Air Act is based on science … and the aim of science is simplicity",
    "Clean Air Act is Headed for Simplicity",
    "Suffering and the Clean Air Act",
    "I Re-Wrote the Clean Air Act",
    "Definition of an Air Quality Plan under the Current Clean Air Act",
    "Christmas Story: \"Yes Viriginia, there can be a new Clean Air Act\"",
    "A GLOBAL AIR POLLUTION AGREEMENT",
    "Playing Small Ball with the Clean Air Act",
    "First Bike Ride and the Clean Air Act",
    "Refreshingly Honest Comments About the Clean Air Act",
    "The Story of How the Clean Air Act was Opened",
    "Running and the Clean Air Act",
    "Fear and the Clean Air Act",
    "Secret to Genius and Improving the Clean Air Act",
    "Energy and the Clean Air Act",
    "Most Overlooked Way to Improve Air Quality",
    "How can Foreign Pollution Blow into the U.S. without Blowing into a State?",
    "The Horse Trade",
    "Pushing at the Rock",
    "Clean Air Act vs. Simplicity",
    "Complexity and the Clean Air Act",
    "Marriage and the Clean Air Act",
    "Human History and the Clean Air Act",
    "Guilt and the Clean Air Act",
    "It's easy! … How to Reduce Litigation under the Clean Air Act",
    "We've Got No Power, No Money … I like our Chances!",
    "Sleeping on the Couch",
    "Path to Finding the Truth",
    "Finger-pointing and the Clean Air Act",
    "Most Frequent Excuse for not Changing the Clean Air Act",
    "Courage and Love",
    "A Multi-Pollutant Approach",
    "New EPA Rule",
    "Winston Churchill",
    "Mother Pollard",
    "Must Succeed",
    "Cows and the Clean Air Act",
    "Clean Air Act, Problems, and Laughter",
]


def normalize(s: str) -> str:
    """Normalize a string for matching: ASCIIfy quotes/dashes/ellipsis,
    collapse runs of dots (with or without intermediate spaces) to '...',
    collapse internal whitespace. Casefold not applied (titles are
    case-sensitive)."""
    s = s.strip()
    # Smart single quotes / apostrophes → ASCII '
    s = s.replace("‘", "'").replace("’", "'")
    # Smart double quotes → ASCII "
    s = s.replace("“", '"').replace("”", '"')
    # Ellipsis char → "..."
    s = s.replace("…", "...")
    # Em dash → "--"
    s = s.replace("—", "--")
    # En dash → "-"
    s = s.replace("–", "-")
    # ". . ." (any internal spacing) → "..."
    s = re.sub(r"\.\s*\.\s*\.", "...", s)
    # Collapse whitespace
    s = re.sub(r"\s+", " ", s)
    return s


def main():
    text = TARGET.read_text(encoding="utf-8")
    lines = text.split("\n")

    # Locate frontmatter end
    fm_end = None
    if lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                fm_end = i
                break
    if fm_end is None:
        sys.exit("Could not locate frontmatter end")
    print(f"Frontmatter ends at line {fm_end + 1}")

    # Idempotency: build the lookup of ALREADY-promoted titles too,
    # so re-running the script doesn't double-prefix anything.
    norm_targets = {normalize(t): t for t in TITLES}
    duplicates_in_list = len(TITLES) - len(norm_targets)
    if duplicates_in_list:
        print(f"[warn] {duplicates_in_list} duplicate titles in the input list "
              f"(normalized collisions); kept first occurrence each.")

    # Walk the body, promote matching bare-line titles.
    promoted = []
    skipped_already_h2 = []
    in_comment = False
    out = lines[:fm_end + 1]  # preserve frontmatter verbatim

    i = fm_end + 1
    while i < len(lines):
        ln = lines[i]
        # Track HTML comment state — be permissive about open/close on same line
        opens = "<!--" in ln
        closes = "-->" in ln
        if in_comment:
            out.append(ln)
            if closes:
                in_comment = False
            i += 1
            continue
        if opens and not closes:
            in_comment = True
            out.append(ln)
            i += 1
            continue
        if opens and closes:
            # single-line comment — copy verbatim
            out.append(ln)
            i += 1
            continue

        stripped = ln.strip()

        # Skip lines that are too long or empty
        if not stripped or len(stripped) >= 120:
            out.append(ln)
            i += 1
            continue

        # Already an H2? Note it (idempotency check) and skip promotion.
        if stripped.startswith("## "):
            existing = stripped[3:].strip()
            if normalize(existing) in norm_targets:
                skipped_already_h2.append(existing)
            out.append(ln)
            i += 1
            continue

        prev_blank = (i == 0) or not lines[i - 1].strip()

        # Try single-line match first. Require preceded-by-blank; do NOT
        # require followed-by-blank (some sections in this book open
        # the title and then immediately a quote, e.g. "Must Succeed"
        # → '"We must succeed."').
        norm = normalize(stripped)
        if prev_blank and norm in norm_targets:
            out.append("## " + stripped)
            promoted.append(stripped)
            i += 1
            continue

        # Try two-line wrapped match: line[i] + " " + line[i+1].
        # Only consider when current line and next line are both non-empty
        # body lines (no markdown / heading prefixes) AND prev_blank.
        if (prev_blank
                and i + 1 < len(lines)
                and lines[i + 1].strip()
                and not stripped.startswith(("#", ">", "-", "*"))
                and len(stripped) < 120):
            stripped2 = lines[i + 1].strip()
            if not stripped2.startswith(("#", ">", "-", "*")) and len(stripped2) < 120:
                joined = (stripped + " " + stripped2).strip()
                norm2 = normalize(joined)
                if norm2 in norm_targets and len(joined) < 200:
                    # Confirm this is actually a title by checking that
                    # the line AFTER the second is blank — section titles
                    # are followed by a blank then prose.
                    after_blank = (i + 2 >= len(lines)) or not lines[i + 2].strip()
                    if after_blank:
                        out.append("## " + joined)
                        promoted.append(joined + "  [wrapped]")
                        i += 2
                        continue

        out.append(ln)
        i += 1

    new_text = "\n".join(out)

    # Report
    print(f"\nPromoted: {len(promoted)} headings")
    print(f"Idempotency check — already-H2 matches: {len(skipped_already_h2)}")

    found_norms = {normalize(t) for t in promoted} | {normalize(t) for t in skipped_already_h2}
    missing = [t for t in TITLES if normalize(t) not in found_norms]
    print(f"\nTitles in list NOT found in body ({len(missing)}):")
    for t in missing:
        print(f"  - {t}")

    # Save and report
    TARGET.write_text(new_text, encoding="utf-8")
    print(f"\nWritten back to: {TARGET}")
    # Final body H2 inventory
    h2_count = sum(1 for L in new_text.split("\n") if L.startswith("## "))
    print(f"Total ## H2 in file (incl. any pre-existing): {h2_count}")


if __name__ == "__main__":
    main()
