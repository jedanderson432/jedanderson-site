"""Generate a hero image for bits-protect-its essay matching the visual essay's cover palette."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path(r"C:\Users\jedan\jedanderson-site\public\images\bits-protect-its-hero.jpg")
W, H = 1200, 800

# Cover palette from the HTML
BG = (10, 16, 32)        # #0a1020
BG2 = (10, 22, 40)       # #0a1628
CYAN = (63, 197, 213)    # #3FC5D5
GOLD = (212, 176, 114)   # #d4b072
LIGHT_GOLD = (244, 233, 212)  # #f4e9d4
TEXT_DIM = (170, 180, 198)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Vertical gradient bg2 → bg
for y in range(H):
    t = y / H
    r = int(BG2[0] * (1 - t) + BG[0] * t)
    g = int(BG2[1] * (1 - t) + BG[1] * t)
    b = int(BG2[2] * (1 - t) + BG[2] * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Try to load nice fonts
def load_font(names, size):
    for n in names:
        try:
            return ImageFont.truetype(n, size)
        except Exception:
            continue
    return ImageFont.load_default()

title_font = load_font([
    "C:/Windows/Fonts/georgiai.ttf",   # Georgia Italic
    "C:/Windows/Fonts/georgia.ttf",
    "C:/Windows/Fonts/times.ttf",
], 150)
title_italic = load_font([
    "C:/Windows/Fonts/georgiai.ttf",
    "C:/Windows/Fonts/timesi.ttf",
], 150)
sub_font = load_font([
    "C:/Windows/Fonts/georgiai.ttf",
    "C:/Windows/Fonts/timesi.ttf",
], 36)
eyebrow_font = load_font([
    "C:/Windows/Fonts/consola.ttf",   # Consolas
    "C:/Windows/Fonts/cour.ttf",
], 18)
mono_font = load_font([
    "C:/Windows/Fonts/consola.ttf",
    "C:/Windows/Fonts/cour.ttf",
], 15)

# Eyebrow
draw.text((90, 110), "AN  ENVIROAI  ESSAY  ·  2026", fill=CYAN, font=eyebrow_font)
draw.line([(90, 145), (160, 145)], fill=CYAN, width=2)

# Title — two words on one line: "Bits Protect" (gold) + "Its" (cyan italic)
# Measure widths
t1 = "Bits Protect "
t2 = "Its"
bbox1 = draw.textbbox((0, 0), t1, font=title_font)
w1 = bbox1[2] - bbox1[0]
bbox2 = draw.textbbox((0, 0), t2, font=title_italic)
w2 = bbox2[2] - bbox2[0]
title_y = 230
draw.text((90, title_y), t1, fill=LIGHT_GOLD, font=title_font)
draw.text((90 + w1, title_y), t2, fill=CYAN, font=title_italic)

# Subtitle
sub = "Why environmental superintelligence is\nnot a preference, not a prediction,\nbut a physical necessity."
draw.multiline_text((90, 460), sub, fill=TEXT_DIM, font=sub_font, spacing=10)

# Gold rule
draw.line([(90, 640), (170, 640)], fill=CYAN, width=3)

# Byline
draw.text((90, 690), "J.  ANDERSON   ·   ENVIROAI", fill=(232, 238, 247), font=eyebrow_font)
draw.text((90, 720), "HOUSTON,  TEXAS   ·   MAY  2026", fill=TEXT_DIM, font=eyebrow_font)

# Right meta
draw.text((W - 320, 110), "BITS  PROTECT  ITS  /  TREATISE", fill=TEXT_DIM, font=mono_font)
draw.text((W - 320, H - 80), "READ  TIME  ~25  MIN", fill=TEXT_DIM, font=mono_font)

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, "JPEG", quality=88, optimize=True)
print(f"Wrote: {OUT}")
