// Crude but standard: 200 wpm, plain whitespace tokenization. Markdown
// noise (links, code) is folded into the word count rather than parsed
// out — close enough for a "reading time" hint.
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
