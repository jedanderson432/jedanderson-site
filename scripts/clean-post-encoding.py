#!/usr/bin/env python3
"""One-time encoding cleanup for src/content/posts/*.md.

Repairs three classes of corruption, POSTS ONLY. Essays, letters, and
books are never read or written.

  1. Windows-1252-as-UTF-8 mojibake (ftfy-style round-trip). The
     re-encode-as-cp1252 / decode-as-utf-8 repair is attempted only on
     strings that carry a known mojibake signature, so already-clean
     text is left byte-for-byte untouched.
  2. HTML entities. Only semicolon-terminated `&name;` / `&#nnn;`
     sequences are decoded, so Constant Contact tracking URLs that
     contain bare `&c=&ch=` query fragments are not mangled.
  3. Spaced em-dashes collapsed to the project's unspaced form
     (word—word). Only horizontal whitespace is collapsed; newlines are
     preserved so paragraph boundaries are never merged.

Before any file is rewritten, the original is copied to
./_post-cleanup-backup/ (gitignored). A changelog with per-file
before/after diff snippets is written to ./_post-cleanup-changelog.md.

Idempotent: running it twice produces no further changes.
"""

from __future__ import annotations

import difflib
import html
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "src" / "content" / "posts"
BACKUP_DIR = ROOT / "_post-cleanup-backup"
CHANGELOG = ROOT / "_post-cleanup-changelog.md"

# Signatures of cp1252-bytes-decoded-as-utf-8 mojibake. The round-trip
# repair only fires when one of these is present in the text.
MOJIBAKE_MARKERS = (
    "Ã©", "Ã¨", "Ã¢", "Ã´", "Ã®", "Ã¯", "Ã¶", "Ã¼", "Ã±", "Ã§", "Ã³", "Ãº",
    "Ã­", "Ã¡", "Ã€", "Ã‰", "â€™", "â€˜", "â€œ", "â€\x9d", "â€“", "â€”",
    "â€¦", "â€¢", "Â ", "Â·", "Â»", "Â«", "Â©", "Â®", "�",
)

# Only semicolon-terminated entities, so bare `&c=` URL fragments survive.
ENTITY_RE = re.compile(r"&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);")
EMDASH = "—"
EMDASH_SPACE_RE = re.compile(r"[ \t]*—[ \t]*")


def fix_mojibake(text: str) -> str:
    if not any(m in text for m in MOJIBAKE_MARKERS):
        return text
    try:
        repaired = text.encode("cp1252", errors="strict").decode("utf-8", errors="strict")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return text
    # Reject a repair that introduces a replacement character it didn't
    # start with — that means the round-trip guessed wrong.
    if "�" in repaired and "�" not in text:
        return text
    return repaired


def fix_entities(text: str) -> str:
    return ENTITY_RE.sub(lambda m: html.unescape(m.group(0)), text)


def fix_spaced_emdash(text: str) -> str:
    return EMDASH_SPACE_RE.sub(EMDASH, text)


def clean(text: str) -> str:
    out = fix_mojibake(text)
    out = fix_entities(out)
    out = fix_spaced_emdash(out)
    return out


def diff_snippet(before: str, after: str, max_lines: int = 8) -> str:
    diff = difflib.unified_diff(
        before.splitlines(), after.splitlines(),
        lineterm="", n=1,
    )
    body = [ln for ln in diff if ln and ln[0] in "+-" and not ln.startswith(("+++", "---"))]
    snippet = body[:max_lines]
    if len(body) > max_lines:
        snippet.append(f"… (+{len(body) - max_lines} more changed lines)")
    return "\n".join(snippet)


def main() -> int:
    posts = sorted(POSTS_DIR.glob("*.md"))
    changed: list[tuple[Path, str]] = []

    for path in posts:
        # Read bytes, decode utf-8 (normalize); fall back to cp1252 only
        # if the file is not valid utf-8 at all.
        raw = path.read_bytes()
        try:
            original = raw.decode("utf-8")
        except UnicodeDecodeError:
            original = raw.decode("cp1252")
        cleaned = clean(original)
        if cleaned == original:
            continue

        # Back up the original before rewriting.
        BACKUP_DIR.mkdir(exist_ok=True)
        shutil.copy2(path, BACKUP_DIR / path.name)

        # Write back as UTF-8 (no BOM). The transforms never touch \r or
        # \n, so `cleaned` already carries the file's original newline
        # style (CRLF or LF) byte-for-byte — encode and write as-is.
        path.write_bytes(cleaned.encode("utf-8"))
        changed.append((path, diff_snippet(original, cleaned)))

    write_changelog(len(posts), changed)
    print(f"Scanned {len(posts)} posts; modified {len(changed)}.")
    return 0


def write_changelog(scanned: int, changed: list[tuple[Path, str]]) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# Post encoding cleanup changelog",
        "",
        f"Run: {ts}",
        f"Scope: `src/content/posts/*.md` only ({scanned} files scanned).",
        f"Files modified: **{len(changed)}**.",
        "",
        "Operations applied (posts only):",
        "1. Windows-1252-as-UTF-8 mojibake repair (signature-gated round-trip).",
        "2. HTML entity decode (semicolon-terminated `&name;` / `&#nnn;` only).",
        "3. Spaced em-dash → unspaced (`word—word`).",
        "",
        "Originals of every modified file are in `_post-cleanup-backup/` (gitignored).",
        "",
    ]
    if not changed:
        lines += [
            "## Result",
            "",
            "No files required changes. The Constant Contact archive was already "
            "clean (entities decoded and encoding normalized during the archive "
            "rebuild in commit 46ec98b). This run confirms it.",
            "",
        ]
    else:
        lines += ["## Files touched", ""]
        for path, snippet in changed:
            lines += [f"### {path.name}", "", "```diff", snippet, "```", ""]
    CHANGELOG.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    raise SystemExit(main())
