"""
extract-cc-emails.py — one-shot extractor for Constant Contact campaign emails.

Run from repo root:
    python scripts/extract-cc-emails.py

Pipeline:
  1. Unzip every *.zip in corpus-inbox/ to corpus-inbox/_unzipped/<zip-stem>/.
  2. Walk every .eml. Recursively descend through message/rfc822 parts.
  3. For each Constant Contact confirmation email (From: noreply@constantcontact.com,
     Subject: starts with "Your campaign", body contains "Subject:" and
     "was sent on" markers), extract title, send date, body, and images.
  4. Save images to public/images/posts/{slug}/img-NN.{ext}; rewrite cid:
     and remote URLs to local paths.
  5. Strip the CC wrapper, convert HTML to markdown, normalize, classify
     PUBLISH vs QUARANTINE, write to src/content/posts/{slug}.md.
  6. Emit docs/CC_INGESTION_REPORT.md and scripts/extract-cc-emails.log.

Idempotent: if src/content/posts/{slug}.md already exists, skip and log.
"""

from __future__ import annotations

import email
import io
import json
import os
import re
import shutil
import sys
import time
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from email import policy
from email.utils import parsedate_to_datetime
from pathlib import Path

from bs4 import BeautifulSoup, Comment
from markdownify import markdownify
from PIL import Image
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(encoding="utf-8")

# ----------------------------- Paths ---------------------------------------
REPO = Path(__file__).resolve().parent.parent
INBOX = Path("C:/Users/jedan/Documents/corpus-inbox")
UNZIP_ROOT = INBOX / "_unzipped"
POSTS_DIR = REPO / "src/content/posts"
ESSAYS_DIR = REPO / "src/content/essays"
LETTERS_DIR = REPO / "src/content/letters"
BOOKS_DIR = REPO / "src/content/books"
IMAGES_BASE = REPO / "public/images/posts"
LOG_PATH = REPO / "scripts/extract-cc-emails.log"
REPORT_PATH = REPO / "docs/CC_INGESTION_REPORT.md"


# ----------------------------- Logging -------------------------------------
LOG_FILE = open(LOG_PATH, "w", encoding="utf-8", newline="\n")


def log(*parts):
    msg = " ".join(str(p) for p in parts)
    print(msg, file=LOG_FILE)
    LOG_FILE.flush()


# ----------------------------- Slug helpers --------------------------------
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def slugify(text: str) -> str:
    s = text.lower()
    # Normalize unicode dashes / ellipses
    s = s.replace("…", " ").replace("—", " ").replace("–", " ")
    s = s.replace("'", "").replace("'", "").replace("’", "").replace("‘", "")
    s = s.replace(""", "").replace(""", "").replace("“", "").replace("”", "")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    if len(s) > 80:
        s = s[:80].rstrip("-")
    return s


def existing_slug_universe() -> set[str]:
    """Slugs across every collection — used for skip-if-exists."""
    slugs = set()
    for d in (POSTS_DIR, ESSAYS_DIR, LETTERS_DIR, BOOKS_DIR):
        if d.exists():
            for f in d.glob("*.md"):
                slugs.add(f.stem)
    return slugs


# ----------------------------- Date parsing --------------------------------
DATE_PATTERNS = [
    # "was sent on 2/22/2023 around 7:30 AM EDT" (or EST etc.)
    re.compile(
        r"was sent on\s+(?P<m>\d{1,2})/(?P<d>\d{1,2})/(?P<y>\d{4})",
        re.I,
    ),
]


def parse_send_date(text: str) -> str | None:
    for pat in DATE_PATTERNS:
        m = pat.search(text)
        if m:
            try:
                dt = datetime(int(m.group("y")), int(m.group("m")), int(m.group("d")))
                return dt.strftime("%Y-%m-%d")
            except ValueError:
                pass
    return None


# ----------------------------- CC email filter -----------------------------
def is_cc_email(msg) -> bool:
    """Detect whether a message is a Constant Contact campaign confirmation."""
    frm = (msg.get("From") or "").lower()
    subj = (msg.get("Subject") or "").strip()
    if "noreply@constantcontact.com" not in frm:
        return False
    if not subj.lower().startswith("your campaign"):
        return False
    return True


def get_html_body(msg) -> str | None:
    for part in msg.walk():
        if part.get_content_type() == "text/html":
            try:
                return part.get_content()
            except Exception:
                pass
    return None


def get_image_parts(msg):
    out = []
    for part in msg.walk():
        ct = part.get_content_type()
        if not ct.startswith("image/"):
            continue
        cid = part.get("Content-ID") or ""
        if cid.startswith("<") and cid.endswith(">"):
            cid = cid[1:-1]
        out.append({"part": part, "cid": cid, "content_type": ct, "filename": part.get_filename() or ""})
    return out


# ----------------------------- Subject / title extraction ------------------
# In the HTML wrapper, the CC confirmation includes:
#   <hr ...>
#   <b>Subject:</b>  TITLE
#   <hr ...>
#   <campaign HTML follows>
#
# We split on the first <hr> after "<b>Subject:</b>" (or the second <hr>
# after the CC-logo image) to isolate the campaign body.
SUBJECT_PATTERNS = [
    re.compile(r"<b>\s*Subject\s*:\s*</b>\s*(?P<title>[^<]+)", re.I),
    re.compile(r"<strong>\s*Subject\s*:\s*</strong>\s*(?P<title>[^<]+)", re.I),
    re.compile(r"\bSubject:\s*(?P<title>[^<\n\r]+)", re.I),
]


def extract_title_from_html(html: str) -> str | None:
    """Return the campaign Subject line raw value."""
    for pat in SUBJECT_PATTERNS:
        m = pat.search(html)
        if m:
            t = m.group("title").strip()
            # Strip surrounding quotes/whitespace
            t = re.sub(r"\s+", " ", t).strip().strip("'\"").strip()
            if t:
                return t
    return None


def strip_cc_wrapper(html: str) -> str:
    """Drop everything from the top through the wrapper Subject: line and
    its trailing <hr>. What remains is the actual campaign HTML."""
    # Find the "<b>Subject:</b> TITLE" position.
    pat = re.compile(r"<b>\s*Subject\s*:\s*</b>[^<]*", re.I)
    m = pat.search(html)
    if not m:
        # Try strong
        m = re.search(r"<strong>\s*Subject\s*:\s*</strong>[^<]*", html, re.I)
    if m:
        after_subject = html[m.end() :]
    else:
        after_subject = html

    # Skip past the next <hr ...> if present (the divider below the Subject:
    # line). Use re.search so we only consume one.
    hr_m = re.search(r"<hr[^>]*>(?:<!--\s*</hr>\s*-->)?", after_subject, re.I)
    if hr_m:
        after_subject = after_subject[hr_m.end() :]

    return after_subject


# ----------------------------- Image localization --------------------------
HTTP = requests.Session()
HTTP.headers["User-Agent"] = "jedanderson-site/cc-ingest/1.0"


def download_external_image(url: str, dest: Path) -> bool:
    try:
        r = HTTP.get(url, timeout=10)
        if r.status_code != 200:
            return False
        dest.write_bytes(r.content)
        return True
    except Exception as e:
        log(f"  image-download-fail {url}: {e}")
        return False


def validate_and_normalize_image(path: Path) -> bool:
    """Validate image with Pillow. Return True if valid."""
    try:
        with Image.open(path) as im:
            im.verify()  # raises on corrupt
        return True
    except Exception as e:
        log(f"  image-corrupt {path}: {e}")
        try:
            path.unlink()
        except OSError:
            pass
        return False


CT_TO_EXT = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/bmp": "bmp",
    "image/svg+xml": "svg",
    "image/tiff": "tiff",
}


def ext_for(content_type: str, filename: str) -> str:
    ct = (content_type or "").lower().split(";")[0].strip()
    if ct in CT_TO_EXT:
        return CT_TO_EXT[ct]
    # Fall back to filename extension
    if filename:
        ext = filename.rsplit(".", 1)[-1].lower()
        if ext in {"jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff"}:
            return "jpg" if ext == "jpeg" else ext
    return "jpg"


def localize_images(html: str, cid_to_part: dict, slug: str, max_images: int = 200) -> tuple[str, int, int]:
    """Save inline + external images locally, rewrite src attributes.

    External downloads run in parallel via a small thread pool.

    Returns (new_html, total_referenced, total_saved).
    """
    soup = BeautifulSoup(html, "html.parser")
    imgs = soup.find_all("img")
    img_dir = IMAGES_BASE / slug
    saved = 0

    # First pass: filter (decompose trackers/logo/empty), classify
    tasks = []  # list of (img_tag, kind, payload, ext)
    counter = 0
    for img in imgs:
        src = img.get("src", "")
        if not src:
            img.decompose()
            continue
        # Tracking pixels (0x0 / 1x1)
        try:
            w = int(img.get("width", "") or "0")
            h = int(img.get("height", "") or "0")
        except Exception:
            w = h = 0
        if (w in (0, 1) and h in (0, 1)) and (w + h <= 2):
            img.decompose()
            continue
        # CC admin wrappers
        if "ctct_logo" in src or "/marketing/campaigns/logos/" in src:
            img.decompose()
            continue
        if src.startswith("data:"):
            img.decompose()
            continue
        counter += 1
        if counter > max_images:
            # Cap: leave remaining <img> elements alone (keep original src)
            continue
        if src.startswith("cid:"):
            cid = src[4:]
            if cid in cid_to_part:
                part = cid_to_part[cid]
                ext = ext_for(part.get_content_type(), part.get_filename() or "")
                tasks.append((img, "cid", part, ext))
            else:
                tasks.append((img, "missing-cid", cid, ""))
        elif src.startswith(("http://", "https://")):
            ext = "jpg"
            url_path = src.split("?")[0].rsplit("/", 1)[-1]
            if "." in url_path:
                cand = url_path.rsplit(".", 1)[-1].lower()
                if cand in {"jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff"}:
                    ext = "jpg" if cand == "jpeg" else cand
            tasks.append((img, "url", src, ext))

    total = len(tasks)
    if not tasks:
        return str(soup), 0, 0

    img_dir.mkdir(parents=True, exist_ok=True)

    # Assign sequential filenames now (must be deterministic in source order)
    assigned = []
    for i, (img_tag, kind, payload, ext) in enumerate(tasks, start=1):
        fname = f"img-{i:02d}.{ext or 'bin'}"
        dest = img_dir / fname
        assigned.append((img_tag, kind, payload, dest))

    # Write cid images synchronously (fast, no network), download URLs in parallel
    cid_jobs = [(img_tag, payload, dest) for img_tag, kind, payload, dest in assigned if kind == "cid"]
    url_jobs = [(img_tag, payload, dest) for img_tag, kind, payload, dest in assigned if kind == "url"]
    miss_jobs = [(img_tag, payload, dest) for img_tag, kind, payload, dest in assigned if kind == "missing-cid"]

    for img_tag, part, dest in cid_jobs:
        try:
            data = part.get_content() if hasattr(part, "get_content") else part.get_payload(decode=True)
            if isinstance(data, str):
                data = data.encode("utf-8", errors="replace")
            dest.write_bytes(data)
            if validate_and_normalize_image(dest):
                saved += 1
                img_tag["src"] = f"/images/posts/{slug}/{dest.name}"
            # If invalid, leave src untouched (validate_and_normalize_image deletes it)
        except Exception as e:
            log(f"  image-save-fail cid: {e}")

    for img_tag, cid, dest in miss_jobs:
        log(f"  image-cid-missing {cid}")

    if url_jobs:
        with ThreadPoolExecutor(max_workers=12) as ex:
            futures = {ex.submit(download_external_image, url, dest): (img_tag, url, dest) for img_tag, url, dest in url_jobs}
            for fut in as_completed(futures):
                img_tag, url, dest = futures[fut]
                try:
                    ok = fut.result()
                except Exception as e:
                    log(f"  image-url-future-err {url[:80]}: {e}")
                    ok = False
                if ok and validate_and_normalize_image(dest):
                    saved += 1
                    img_tag["src"] = f"/images/posts/{slug}/{dest.name}"
                else:
                    log(f"  image-url-failed {url[:80]}")

    return str(soup), total, saved


# ----------------------------- HTML cleanup --------------------------------
FOOTER_PHRASES = (
    "constant contact",
    "view this email in your browser",
    "view as webpage",
    "view as a webpage",
    "this email was sent to",
    "unsubscribe",
)


def clean_campaign_html(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # Remove comments
    for c in soup.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()

    # Drop <style>, <script>, <link>
    for tag in soup.find_all(["style", "script", "link", "meta"]):
        tag.decompose()

    # Drop <font> by unwrapping
    for tag in soup.find_all("font"):
        tag.unwrap()

    # Strip class, style, id from all tags
    for tag in soup.find_all(True):
        for attr in ("class", "style", "id", "border", "cellpadding", "cellspacing",
                     "align", "valign", "bgcolor", "color", "face", "lang", "xmlns",
                     "xmlns:xsi", "xsi:schemalocation", "data-pre", "leftmargin",
                     "rightmargin", "topmargin"):
            if attr in tag.attrs:
                del tag.attrs[attr]

    # Remove tracking pixels (already handled in image localization, but
    # double-check on remaining <img> referencing tracking URLs).
    for img in soup.find_all("img"):
        try:
            w = int(img.get("width", "") or "0")
            h = int(img.get("height", "") or "0")
        except Exception:
            w = h = 0
        if (w in (0, 1) and h in (0, 1)) and (w + h <= 2):
            img.decompose()

    # Strip footer blocks. A footer block is a <table>, <div>, or <p>
    # whose visible text contains an unsubscribe link / "constant contact" /
    # the physical-address pattern.
    for el in soup.find_all(["table", "div", "p"]):
        text = (el.get_text() or "").lower()
        if not text.strip():
            continue
        if any(phrase in text for phrase in FOOTER_PHRASES):
            # Heuristic: only strip if the element is near the bottom
            # (text is short relative to overall) or contains "unsubscribe"
            if "unsubscribe" in text or "view as webpage" in text:
                el.decompose()
                continue
            if "constant contact" in text and len(text) < 500:
                el.decompose()
                continue

    # Drop empty <p>, <span>, <div>
    for tag in soup.find_all(["p", "span", "div"]):
        if not tag.get_text(strip=True) and not tag.find("img"):
            tag.decompose()

    return str(soup)


# ----------------------------- Markdown post-processing --------------------
def postprocess_markdown(md: str) -> str:
    # Collapse triple+ blank lines to two
    md = re.sub(r"\n{3,}", "\n\n", md)
    # Strip trailing whitespace
    md = "\n".join(line.rstrip() for line in md.splitlines())
    # Unspace em-dashes (project convention)
    md = re.sub(r"[ \xa0]+—[ \xa0]+", "—", md)
    md = md.replace("\xa0", " ")
    # Remove any wrapper leakage that survived
    leak_patterns = [
        r"Below is a copy[^\n]*",
        r"was sent on[^\n]*",
        r"around \d{1,2}:\d{2}\s*(AM|PM)\s*E[SD]T[^\n]*",
        r"in your account[^\n]*",
        r"^\s*Subject:.*$",
    ]
    for p in leak_patterns:
        md = re.sub(p, "", md, flags=re.I | re.M)
    md = re.sub(r"\n{3,}", "\n\n", md).strip() + "\n"
    return md


# ----------------------------- Quarantine classification -------------------
def classify(post_body: str, total_images_referenced: int, total_images_saved: int) -> tuple[str, str | None]:
    """Return ('publish' or 'quarantine', reason_or_none)."""
    # Strip frontmatter-like content for word counting
    body = post_body.strip()
    words = re.findall(r"\b\w+\b", body)
    wc = len(words)
    if wc < 50:
        return "quarantine", f"short:body_only_{wc}_words"
    low = body.lower()
    if "below is a copy" in low:
        return "quarantine", "wrapper-leak:below-is-a-copy"
    if "view as webpage" in low:
        return "quarantine", "wrapper-leak:view-as-webpage"
    # Unsubscribe outside first/last 100 chars → footer leak
    if "unsubscribe" in low:
        first_idx = low.find("unsubscribe")
        if 100 <= first_idx <= len(low) - 100:
            return "quarantine", "footer-leak:unsubscribe"
    # 3+ images referenced but fewer than half saved
    if total_images_referenced >= 3 and total_images_saved < total_images_referenced / 2:
        return "quarantine", f"image-extraction:{total_images_saved}/{total_images_referenced}"
    # 5+ unescaped angle brackets (HTML didn't convert)
    bracket_count = len(re.findall(r"[<>]", body))
    if bracket_count >= 5:
        return "quarantine", f"html-leak:{bracket_count}-brackets"
    return "publish", None


# ----------------------------- Abstract ------------------------------------
def make_abstract(body_md: str, max_chars: int = 200) -> str:
    """Pull first 200ish chars of prose, ending at a sentence boundary."""
    text = body_md
    # Strip markdown images, links, headers
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^#+\s+", "", text, flags=re.M)
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return ""
    if len(text) <= max_chars:
        return text
    # Cut at the last sentence boundary before max_chars
    cut = text[:max_chars]
    m = list(re.finditer(r"[.!?](?:\s|$)", cut))
    if m:
        idx = m[-1].end()
        return text[:idx].strip()
    return cut.rstrip() + "…"


# ----------------------------- YAML helper ---------------------------------
def yaml_dq(value: str) -> str:
    if value is None:
        return '""'
    s = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


# ----------------------------- Main pipeline -------------------------------
def unzip_all() -> list[Path]:
    """Unzip every *.zip in corpus-inbox/ to UNZIP_ROOT/<stem>/. Idempotent."""
    UNZIP_ROOT.mkdir(parents=True, exist_ok=True)
    zips = sorted(INBOX.glob("*.zip"))
    extracted_roots = []
    for z in zips:
        target = UNZIP_ROOT / z.stem
        if target.exists() and any(target.iterdir()):
            log(f"unzip-skip {z.name} (already extracted)")
            extracted_roots.append(target)
            continue
        target.mkdir(parents=True, exist_ok=True)
        try:
            with zipfile.ZipFile(z, "r") as zf:
                zf.extractall(target)
            log(f"unzip-ok {z.name} -> {target}")
        except Exception as e:
            log(f"unzip-fail {z.name}: {e}")
            continue
        extracted_roots.append(target)
    return extracted_roots


def walk_eml(path: Path):
    """Yield (msg, source_path) for every CC email found at path or nested
    inside message/rfc822 parts."""
    try:
        with open(path, "rb") as f:
            msg = email.message_from_binary_file(f, policy=policy.default)
    except Exception as e:
        log(f"  parse-fail {path.name}: {e}")
        return

    found_any = False
    # Walk through all parts looking for rfc822 inner messages
    for part in msg.walk():
        if part.get_content_type() == "message/rfc822":
            try:
                inner = part.get_payload()
                if isinstance(inner, list):
                    inner = inner[0]
                if is_cc_email(inner):
                    found_any = True
                    yield inner, path
            except Exception as e:
                log(f"  rfc822-parse-fail {path.name}: {e}")

    # If no nested rfc822 found, check if the top-level itself is a CC email
    if not found_any and is_cc_email(msg):
        yield msg, path


def process_one_email(msg, source_path: Path, used_slugs: set, existing_slugs: set, stats: dict):
    """Extract one CC email; write markdown + images; classify."""
    html = get_html_body(msg)
    if not html:
        log(f"  no-html {source_path.name}")
        stats["failed"].append({"source": source_path.name, "reason": "no html body"})
        return

    title = extract_title_from_html(html)
    if not title:
        log(f"  no-title {source_path.name}")
        stats["failed"].append({"source": source_path.name, "reason": "no Subject: line in body"})
        return

    # Send date: prefer body text, fall back to Date header
    iso_date = parse_send_date(html)
    if not iso_date:
        try:
            dt = parsedate_to_datetime(msg.get("Date"))
            iso_date = dt.astimezone(timezone.utc).strftime("%Y-%m-%d")
        except Exception:
            iso_date = datetime.now().strftime("%Y-%m-%d")

    # Slug
    base_slug = slugify(title)
    if not base_slug or not SLUG_RE.match(base_slug):
        log(f"  bad-slug from title {title!r}")
        stats["failed"].append({"source": source_path.name, "title": title,
                                "reason": "could not generate valid slug"})
        return

    slug = base_slug
    suffix = 2
    while slug in used_slugs:
        slug = f"{base_slug}-{suffix}"
        suffix += 1
    used_slugs.add(slug)

    # Idempotency check against existing files
    dest_md = POSTS_DIR / f"{slug}.md"
    if dest_md.exists() or slug in existing_slugs:
        log(f"  skipped:already_exists slug={slug}")
        stats["skipped"].append({"slug": slug, "title": title, "reason": "already_exists"})
        return

    # Strip CC wrapper, then collect inline-image cid map
    cid_to_part = {}
    for ip in get_image_parts(msg):
        if ip["cid"]:
            cid_to_part[ip["cid"]] = ip["part"]

    body_html = strip_cc_wrapper(html)
    body_html, total_imgs, saved_imgs = localize_images(body_html, cid_to_part, slug)
    body_html = clean_campaign_html(body_html)

    # Convert to markdown
    md_body = markdownify(body_html, heading_style="ATX", bullets="-",
                         strip=["script", "style"])
    md_body = postprocess_markdown(md_body)

    # Classify
    decision, reason = classify(md_body, total_imgs, saved_imgs)

    abstract = make_abstract(md_body, 200)
    if not abstract:
        abstract = title

    # Compose frontmatter
    fm = [
        "---",
        f"title: {yaml_dq(title)}",
        f"slug: {yaml_dq(slug)}",
        f"date: {iso_date}",
        "type: post",
        f"status: {'published' if decision == 'publish' else 'draft'}",
        'tags: ["faith", "constant-contact-archive"]',
        f"abstract: {yaml_dq(abstract)}",
        "license: CC-BY-4.0",
        'original_source: "Constant Contact campaign"',
    ]
    if decision == "quarantine":
        fm.append(f"quarantine_reason: {yaml_dq(reason or 'unspecified')}")
    fm.append("---")

    out = "\n".join(fm) + "\n\n" + md_body.strip() + "\n"
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    dest_md.write_text(out, encoding="utf-8", newline="\n")

    rec = {
        "slug": slug,
        "title": title,
        "date": iso_date,
        "word_count": len(re.findall(r"\b\w+\b", md_body)),
        "images_referenced": total_imgs,
        "images_saved": saved_imgs,
        "decision": decision,
        "reason": reason,
        "source": source_path.name,
    }
    if decision == "publish":
        stats["published"].append(rec)
        log(f"  published {slug} ({iso_date}, {rec['word_count']} words, {saved_imgs}/{total_imgs} imgs)")
    else:
        stats["quarantined"].append(rec)
        log(f"  quarantined {slug} ({iso_date}) reason={reason}")


def reconstruct_stats_from_existing_cc_posts():
    """On re-run, scan src/content/posts/ for files tagged constant-contact-archive
    and seed stats so the report aggregates across all batches."""
    stats = {"published": [], "quarantined": [], "skipped": [], "failed": [], "non_cc_skipped": 0}
    cc_slugs = set()
    if not POSTS_DIR.exists():
        return stats, cc_slugs
    for p in POSTS_DIR.glob("*.md"):
        text = p.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
        if not m:
            continue
        fm, body = m.group(1), m.group(2)
        if "constant-contact-archive" not in fm:
            continue
        slug = p.stem
        cc_slugs.add(slug)
        title_m = re.search(r"^title:\s*(.+?)$", fm, re.M)
        date_m = re.search(r"^date:\s*(\S+)", fm, re.M)
        status_m = re.search(r"^status:\s*(\w+)", fm, re.M)
        qreason_m = re.search(r"^quarantine_reason:\s*(.+?)$", fm, re.M)
        title = (title_m.group(1).strip().strip("\"'") if title_m else slug)
        date = (date_m.group(1) if date_m else "")
        wc = len(re.findall(r"\b\w+\b", body))
        # Count images by scanning local references in body
        imgs = len(re.findall(r"!\[[^\]]*\]\(/images/posts/", body))
        rec = {
            "slug": slug,
            "title": title,
            "date": date,
            "word_count": wc,
            "images_referenced": imgs,
            "images_saved": imgs,
            "decision": "publish" if (status_m and status_m.group(1) == "published") else "quarantine",
            "reason": (qreason_m.group(1).strip().strip("\"'") if qreason_m else None),
            "source": "(from previous run)",
        }
        if rec["decision"] == "publish":
            stats["published"].append(rec)
        else:
            stats["quarantined"].append(rec)
    return stats, cc_slugs


def main():
    t0 = time.time()
    log(f"=== extract-cc-emails.py start {datetime.now().isoformat()} ===")
    existing_slugs = existing_slug_universe()
    log(f"Pre-existing slugs across collections: {len(existing_slugs)}")

    # Seed stats with CC posts written by any prior run; their slugs prefix into
    # `existing_slugs` so we skip re-processing.
    stats, cc_slugs = reconstruct_stats_from_existing_cc_posts()
    if cc_slugs:
        log(f"Reconstructed {len(cc_slugs)} CC posts from previous run "
            f"({len(stats['published'])} published, {len(stats['quarantined'])} quarantined)")

    extracted_roots = unzip_all()
    log(f"Extracted-zip roots: {len(extracted_roots)}")

    # Walk every .eml under UNZIP_ROOT
    all_emls = []
    for root in extracted_roots:
        all_emls.extend(sorted(root.rglob("*.eml")))
    log(f"Total .eml files: {len(all_emls)}")

    used_slugs = set(cc_slugs)  # protect existing CC posts from slug collision

    # Within-batch dedup: (title.lower(), date) → first slug; subsequent → quarantine.
    # Seed from already-published records so re-runs respect prior dedup decisions.
    seen_pairs = {}
    for r in stats["published"]:
        if r.get("title") and r.get("date"):
            seen_pairs[(r["title"].lower(), r["date"])] = r["slug"]

    for eml_path in all_emls:
        any_yield = False
        for msg, src in walk_eml(eml_path):
            any_yield = True
            # We have a CC email
            title = extract_title_from_html(get_html_body(msg) or "")
            iso_date = parse_send_date(get_html_body(msg) or "") or ""
            key = ((title or "").lower(), iso_date) if title else None
            if key and key in seen_pairs:
                # Force quarantine by writing with quarantine reason
                # We let the normal flow handle it but pre-mark via stats
                process_one_email_dedup_aware(msg, src, used_slugs, existing_slugs, stats, dedup_first=seen_pairs[key])
                continue
            else:
                # Process normally
                before_pub = len(stats["published"])
                process_one_email(msg, src, used_slugs, existing_slugs, stats)
                # If just published or quarantined, register the (title, date) pair
                if key:
                    # Find the slug we just used (last appended)
                    new_recs = stats["published"][before_pub:] + (
                        stats["quarantined"][len(stats["quarantined"]) - 1:]
                        if stats["quarantined"]
                        else []
                    )
                    if stats["published"][before_pub:]:
                        seen_pairs[key] = stats["published"][-1]["slug"]
                    elif stats["quarantined"]:
                        last = stats["quarantined"][-1]
                        if last["source"] == src.name:
                            seen_pairs[key] = last["slug"]
        if not any_yield:
            stats["non_cc_skipped"] += 1
            log(f"non-cc-skip {eml_path.name}")

    elapsed = time.time() - t0
    log(f"=== done in {elapsed:.1f}s ===")
    log(f"published={len(stats['published'])} quarantined={len(stats['quarantined'])} "
        f"skipped-already-exists={len(stats['skipped'])} failed={len(stats['failed'])} "
        f"non-cc-eml-files={stats['non_cc_skipped']}")

    # Save stats
    stats_path = Path("scripts/cc-ingest-stats.json")
    stats_path.write_text(json.dumps(stats, indent=2, default=str), encoding="utf-8")
    return stats


def process_one_email_dedup_aware(msg, source_path, used_slugs, existing_slugs, stats, dedup_first):
    """Variant that forces quarantine because (title, date) duplicates an earlier publish."""
    # We need a slug; use the same logic but with a dedup suffix
    html = get_html_body(msg)
    if not html:
        stats["failed"].append({"source": source_path.name, "reason": "no html body"})
        return
    title = extract_title_from_html(html)
    if not title:
        stats["failed"].append({"source": source_path.name, "reason": "no Subject: line in body"})
        return
    iso_date = parse_send_date(html)
    if not iso_date:
        try:
            dt = parsedate_to_datetime(msg.get("Date"))
            iso_date = dt.astimezone(timezone.utc).strftime("%Y-%m-%d")
        except Exception:
            iso_date = datetime.now().strftime("%Y-%m-%d")
    base = slugify(title)
    slug = base
    suffix = 2
    while slug in used_slugs:
        slug = f"{base}-{suffix}"; suffix += 1
    used_slugs.add(slug)
    if (POSTS_DIR / f"{slug}.md").exists() or slug in existing_slugs:
        stats["skipped"].append({"slug": slug, "title": title, "reason": "already_exists"})
        return
    fm = [
        "---",
        f"title: {yaml_dq(title)}",
        f"slug: {yaml_dq(slug)}",
        f"date: {iso_date}",
        "type: post",
        "status: draft",
        'tags: ["faith", "constant-contact-archive"]',
        f"abstract: {yaml_dq(title)}",
        "license: CC-BY-4.0",
        'original_source: "Constant Contact campaign"',
        f"quarantine_reason: {yaml_dq('dedup:title+date matches ' + dedup_first)}",
        "---",
    ]
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    (POSTS_DIR / f"{slug}.md").write_text("\n".join(fm) + "\n\n_(duplicate of " + dedup_first + ")_\n",
                                          encoding="utf-8", newline="\n")
    stats["quarantined"].append({
        "slug": slug, "title": title, "date": iso_date, "word_count": 0,
        "images_referenced": 0, "images_saved": 0,
        "decision": "quarantine", "reason": f"dedup:title+date matches {dedup_first}",
        "source": source_path.name,
    })
    log(f"  quarantined (dedup) {slug} matches {dedup_first}")


# ----------------------------- Report --------------------------------------
def write_report(stats):
    pub = stats["published"]
    quar = stats["quarantined"]
    failed = stats["failed"]
    skipped = stats["skipped"]

    # Date range
    dates_all = [r["date"] for r in pub + quar if r.get("date")]
    earliest = min(dates_all) if dates_all else "—"
    latest = max(dates_all) if dates_all else "—"

    total_images = sum(r.get("images_saved", 0) for r in pub + quar)

    # File size of all written markdown
    total_bytes = 0
    for r in pub + quar:
        p = POSTS_DIR / f"{r['slug']}.md"
        if p.exists():
            total_bytes += p.stat().st_size

    # Quarantine reason breakdown
    quar_reasons = Counter((r.get("reason") or "unspecified").split(":", 1)[0] for r in quar)

    lines = [
        "# Constant Contact Ingestion Report",
        "",
        f"Generated: {datetime.now().isoformat(timespec='seconds')}",
        "",
        "## Summary",
        "",
        f"- Emails processed (CC campaigns found): **{len(pub) + len(quar) + len(failed)}**",
        f"- Published: **{len(pub)}**",
        f"- Quarantined: **{len(quar)}**",
    ]
    for reason, count in quar_reasons.most_common():
        lines.append(f"  - {reason}: {count}")
    lines += [
        f"- Failed extractions: **{len(failed)}**",
        f"- Skipped (slug already existed): **{len(skipped)}**",
        f"- Non-CC .eml files skipped: **{stats.get('non_cc_skipped', 0)}**",
        f"- Date range: {earliest} → {latest}",
        f"- Total images extracted: **{total_images}**",
        f"- Total markdown file size: **{total_bytes / 1024:.1f} KB**",
        "",
        "## Published posts",
        "",
        "Sorted by date descending.",
        "",
        "| date | title | slug | word count | image count |",
        "|------|-------|------|------------|-------------|",
    ]
    for r in sorted(pub, key=lambda x: x["date"], reverse=True):
        title = r["title"].replace("|", "\\|")
        lines.append(f"| {r['date']} | {title[:80]} | `{r['slug']}` | {r['word_count']} | {r['images_saved']} |")

    lines += [
        "",
        "## Quarantined posts",
        "",
        "Sorted by date descending.",
        "",
        "| date | title | slug | word count | image count | reason |",
        "|------|-------|------|------------|-------------|--------|",
    ]
    for r in sorted(quar, key=lambda x: x.get("date") or "", reverse=True):
        title = (r.get("title") or "").replace("|", "\\|")
        lines.append(
            f"| {r.get('date','—')} | {title[:80]} | `{r['slug']}` | "
            f"{r.get('word_count','?')} | {r.get('images_saved','?')} | {r.get('reason','')} |"
        )

    if failed:
        lines += ["", "## Failed extractions", ""]
        for r in failed:
            lines.append(f"- `{r.get('source','?')}`: {r.get('reason','?')}")
            if r.get("title"):
                lines.append(f"  - title: {r['title']}")

    if skipped:
        lines += ["", "## Skipped (slug already existed)", ""]
        for r in skipped:
            lines.append(f"- `{r['slug']}` — {r.get('title','?')}")

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    log(f"Wrote report to {REPORT_PATH}")


if __name__ == "__main__":
    stats = main()
    write_report(stats)
    LOG_FILE.close()
    print("DONE")
