import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export type Line = {
  text: string;
  anchor: string;
  from: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LINES_PATH = path.resolve(__dirname, '..', '..', 'docs', 'LINES.md');

function stripOuterDoubleQuotes(s: string): string {
  const trimmed = s.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function loadLines(): Line[] {
  if (!existsSync(LINES_PATH)) {
    console.warn(`[lines] docs/LINES.md not found at ${LINES_PATH}; rendering empty list.`);
    return [];
  }

  let raw: string;
  try {
    raw = readFileSync(LINES_PATH, 'utf-8');
  } catch (err) {
    console.warn(`[lines] failed to read docs/LINES.md: ${(err as Error).message}`);
    return [];
  }

  // Strip preamble: everything up to and including the first standalone "---" line.
  const lines = raw.split(/\r?\n/);
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      bodyStart = i + 1;
      break;
    }
  }
  const body = lines.slice(bodyStart).join('\n');

  // Split on blank lines into raw entry blocks.
  const blocks = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  const entries: Line[] = [];
  for (const block of blocks) {
    // Expected three-line shape:
    //   - line: "<text>"
    //     anchor: <slug>
    //     from: <slug-or-standalone>
    const blockLines = block.split(/\r?\n/);
    let text = '';
    let anchor = '';
    let from = '';

    for (const bl of blockLines) {
      const trimmed = bl.trim();
      if (trimmed.startsWith('- line:')) {
        const value = trimmed.slice('- line:'.length).trim();
        text = stripOuterDoubleQuotes(value);
      } else if (trimmed.startsWith('line:')) {
        const value = trimmed.slice('line:'.length).trim();
        text = stripOuterDoubleQuotes(value);
      } else if (trimmed.startsWith('anchor:')) {
        anchor = trimmed.slice('anchor:'.length).trim();
      } else if (trimmed.startsWith('from:')) {
        from = trimmed.slice('from:'.length).trim();
      }
    }

    if (!text || !anchor) {
      console.warn(`[lines] skipping malformed entry: ${block.slice(0, 80)}…`);
      continue;
    }
    entries.push({ text, anchor, from: from || 'standalone' });
  }

  return entries;
}
