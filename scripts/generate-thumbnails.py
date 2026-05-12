"""
Generate typographic placeholder thumbnails for essays without hero_image.

Run from repo root:
    python scripts/generate-thumbnails.py

Idempotent: skips files that already exist in public/images/.
Output: public/images/{slug}-thumb.jpg at 320×320 (renders crisply at the
80×80 displayed size on the essays index).

Cream paper background, dark ink serif text (first 1-3 words of the title),
and a small accent rule below.
"""

import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
ESSAYS = REPO / "src/content/essays"
IMG_DIR = REPO / "public/images"

PAPER = (251, 250, 246)   # tailwind paper #fbfaf6
INK = (26, 26, 26)        # tailwind ink   #1a1a1a
ACCENT = (122, 90, 58)    # tailwind accent #7a5a3a

SIZE = 320
FONT_CANDIDATES = [
    "C:/Windows/Fonts/georgiab.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/Library/Fonts/Georgia Bold.ttf",
]


def find_font_path() -> str:
    for p in FONT_CANDIDATES:
        if Path(p).exists():
            return p
    raise FileNotFoundError("No suitable serif font found; install Georgia Bold or update FONT_CANDIDATES.")


def short_title_for(title: str) -> str:
    """Pick 1-3 words for the thumbnail: drop everything after a colon,
    drop a leading 'The', take the first three words of what remains."""
    t = title
    if ":" in t:
        t = t.split(":")[0].strip()
    t = re.sub(r"^The\s+", "", t)
    return " ".join(t.split()[:3])


def render_thumb(title: str, dest: Path, font_path: str) -> None:
    img = Image.new("RGB", (SIZE, SIZE), PAPER)
    draw = ImageDraw.Draw(img)
    short = short_title_for(title)
    margin = 24
    max_w = SIZE - 2 * margin
    line_h = 0
    lines: list[str] = []
    font: ImageFont.FreeTypeFont
    for fsize in range(82, 28, -2):
        font = ImageFont.truetype(font_path, fsize)
        lines = []
        cur: list[str] = []
        for w in short.split():
            test = " ".join(cur + [w])
            bbox = draw.textbbox((0, 0), test, font=font)
            if bbox[2] - bbox[0] <= max_w:
                cur.append(w)
            else:
                if cur:
                    lines.append(" ".join(cur))
                cur = [w]
        if cur:
            lines.append(" ".join(cur))
        ascent, descent = font.getmetrics()
        line_h = ascent + descent
        total_h = line_h * len(lines)
        max_line_w = max(
            draw.textbbox((0, 0), L, font=font)[2] - draw.textbbox((0, 0), L, font=font)[0]
            for L in lines
        )
        if total_h <= SIZE - 2 * margin and max_line_w <= max_w:
            break
    total_h = line_h * len(lines)
    y = (SIZE - total_h) // 2
    for L in lines:
        bbox = draw.textbbox((0, 0), L, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((SIZE - w) // 2, y), L, fill=INK, font=font)
        y += line_h
    rule_y = y + 4
    if rule_y < SIZE - 12:
        draw.line([(SIZE // 3, rule_y), (SIZE - SIZE // 3, rule_y)], fill=ACCENT, width=2)
    img.save(dest, "JPEG", quality=88, optimize=True)


def main() -> None:
    font_path = find_font_path()
    generated: list[str] = []
    skipped: list[str] = []
    for f in sorted(ESSAYS.glob("*.md")):
        text = f.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---", text, re.S)
        if not m:
            continue
        fm = m.group(1)
        status_m = re.search(r"^status:\s*(\w+)", fm, re.M)
        if not status_m or status_m.group(1).strip().lower() != "published":
            continue
        if re.search(r"^hero_image:\s*", fm, re.M):
            continue
        title_m = re.search(r"^title:\s*(['\"]?)(.+?)\1\s*$", fm, re.M)
        title = title_m.group(2) if title_m else f.stem
        dest = IMG_DIR / f"{f.stem}-thumb.jpg"
        if dest.exists():
            skipped.append(f.stem)
            continue
        render_thumb(title, dest, font_path)
        generated.append(f.stem)
        print(f"GEN  {f.stem}-thumb.jpg ({short_title_for(title)})")
    if skipped:
        print(f"\nSkipped (already exist): {len(skipped)}")
    print(f"Generated: {len(generated)} new thumbnails")


if __name__ == "__main__":
    main()
