"""Post-deploy spot-check for CC archive V2.

Picks 5 random published CC posts, fetches their URLs, expects HTTP 200.
Also checks one image URL (HTTP 200 + non-zero content-length).
Also greps 3 random published posts for the failure patterns we explicitly
ruled out in V2: `&amp;`, `&quot;`, `| ---` table skeleton.
"""
import random
import re
import sys
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

REPO = Path("C:/Users/jedan/jedanderson-site/.claude/worktrees/priceless-brahmagupta-c9bad3")
POSTS = REPO / "src/content/posts"
BASE_URL = "https://jedanderson.org"

random.seed(20260513)

# Find all published CC posts
cc_pub = []
for p in sorted(POSTS.glob("*.md")):
    text = p.read_text(encoding="utf-8")
    if "constant-contact-archive" not in text:
        continue
    if "status: published" not in text:
        continue
    cc_pub.append(p)

print(f"Total published CC posts: {len(cc_pub)}")
print()

# 5 random URL checks
sample = random.sample(cc_pub, 5)
print("=== URL HTTP 200 checks ===")
url_pass = 0
for p in sample:
    slug = p.stem
    url = f"{BASE_URL}/posts/{slug}/"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "cc-spotcheck/1.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            print(f"  {r.status} {url}")
            if r.status == 200:
                url_pass += 1
    except Exception as e:
        print(f"  FAIL {url}: {e}")
print(f"URL pass: {url_pass}/5")
print()

# 1 image URL check — find any post with image refs
print("=== Image URL HTTP 200 check ===")
img_url = None
for p in cc_pub:
    text = p.read_text(encoding="utf-8")
    m = re.search(r"/images/posts/[^/]+/img-\d+\.\w+", text)
    if m:
        img_url = f"{BASE_URL}{m.group(0)}"
        break
if img_url:
    try:
        req = urllib.request.Request(img_url, headers={"User-Agent": "cc-spotcheck/1.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            body = r.read()
            print(f"  {r.status} {img_url} ({len(body)} bytes)")
    except Exception as e:
        print(f"  FAIL {img_url}: {e}")
else:
    print("  (no CC posts with local image refs found — unexpected)")
print()

# 3 random failure-pattern greps
print("=== Failure-pattern grep (entities + table skeleton) ===")
grep_sample = random.sample(cc_pub, min(3, len(cc_pub)))
fail_total = 0
for p in grep_sample:
    text = p.read_text(encoding="utf-8")
    fails = []
    if re.search(r"&amp;[a-z]+;|&amp;\s|&amp;$", text):
        fails.append("amp")
    if "&quot;" in text:
        fails.append("quot")
    if re.search(r"\|\s*-+\s*\|", text):
        fails.append("table-skel")
    if re.search(r"&(nbsp|ndash|mdash|hellip);", text):
        fails.append("entity")
    status = "FAIL: " + ", ".join(fails) if fails else "clean"
    print(f"  {p.stem}: {status}")
    fail_total += len(fails)
print(f"Total failure-patterns found: {fail_total}")
