// Count the pages of a PDF without pulling in a PDF library.
//
// Page objects are dictionaries carrying `/Type /Page` (distinct from the
// page-tree nodes, which carry `/Type /Pages`). Counting those is exact for
// every PDF this repo produces. Two wrinkles are handled:
//
//   - Object streams. A PDF may pack objects into Flate-compressed /ObjStm
//     streams, where the page dicts are invisible in the raw bytes. Any
//     stream that inflates is scanned too.
//   - Nothing found. If neither pass sees a page object, fall back to the
//     largest /Count in the page tree, which is the root node's total.
//
// Returns null when the file cannot be read as a PDF at all, so callers can
// distinguish "not a PDF" from "zero pages".

import { readFileSync } from 'node:fs';
import zlib from 'node:zlib';

const PAGE_OBJ = /\/Type\s*\/Page(?![s])/g;
const COUNT = /\/Count\s+(\d+)/g;

export function pdfPageCount(filePath) {
  let buf;
  try {
    buf = readFileSync(filePath);
  } catch {
    return null;
  }
  // latin1 keeps a 1:1 byte↔char mapping, so binary sections cannot merge
  // or split the ASCII markers being matched.
  const raw = buf.toString('latin1');
  if (!raw.startsWith('%PDF-')) return null;

  let pages = (raw.match(PAGE_OBJ) || []).length;

  // Scan inflatable streams for page objects hidden in object streams.
  const streamStart = /stream\r?\n/g;
  let m;
  while ((m = streamStart.exec(raw)) !== null) {
    const start = m.index + m[0].length;
    const end = raw.indexOf('endstream', start);
    if (end < 0) continue;
    try {
      const out = zlib.inflateSync(buf.subarray(start, end)).toString('latin1');
      pages += (out.match(PAGE_OBJ) || []).length;
    } catch {
      // not a Flate stream, or not inflatable on its own — skip it
    }
  }

  if (pages > 0) return pages;

  const counts = [...raw.matchAll(COUNT)].map((c) => Number(c[1]));
  return counts.length ? Math.max(...counts) : null;
}
