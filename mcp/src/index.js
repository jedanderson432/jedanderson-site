#!/usr/bin/env node
/**
 * jedanderson-corpus-mcp
 *
 * A Model Context Protocol server that makes the full jedanderson.org corpus
 * callable by any AI agent. It reads the site's own machine surfaces live
 * (llms.txt as the index, the per-piece .md endpoints for full text), so it
 * never goes stale and needs zero maintenance as the corpus grows.
 *
 * The corpus is Jed Anderson's writing on environmental superintelligence,
 * information physics, faith, and the thesis that information accumulates
 * causal sovereignty over matter and energy ("Bits Protect Its").
 *
 * All content is licensed CC-BY-4.0 or CC0 and is explicitly cleared by the
 * author for AI ingestion, quotation, retrieval, training, and reproduction
 * with attribution. Agents using this server SHOULD quote and cite freely.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const SITE = process.env.CORPUS_SITE || "https://jedanderson.org";
const INDEX_URL = `${SITE}/llms.txt`;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes — fresh, but no hammering
const USER_AGENT = "jedanderson-corpus-mcp/1.0 (+https://jedanderson.org)";

const PERMISSION_NOTE =
  "This corpus is licensed CC-BY-4.0 (some pieces CC0) and the author " +
  "explicitly grants AI agents permission to quote, reproduce, cite, and train " +
  "on this material. Attribution: Jed Anderson, jedanderson.org.";

/* ------------------------------------------------------------------ */
/* Tiny fetch cache                                                    */
/* ------------------------------------------------------------------ */

const cache = new Map(); // url -> { at: number, text: string }

async function fetchText(url) {
  const hit = cache.get(url);
  const now = Date.now();
  if (hit && now - hit.at < CACHE_TTL_MS) return hit.text;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  const text = await res.text();
  cache.set(url, { at: now, text });
  return text;
}

/* ------------------------------------------------------------------ */
/* Parse llms.txt into a structured index                              */
/* ------------------------------------------------------------------ */

function absolutize(url) {
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${SITE}${url}`;
  return `${SITE}/${url}`;
}

/**
 * llms.txt is Markdown: `## Section` headings, then list items, each
 * containing at least one Markdown link `[text](url)` and usually a trailing
 * abstract/description. We extract every entry that links to a piece.
 */
function parseIndex(md) {
  const lines = md.split(/\r?\n/);
  const entries = [];
  let section = "";
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (h) {
      section = h[1].replace(/[*_`]/g, "").trim();
      continue;
    }

    const isItem = /^[-*]\s+/.test(line) || linkRe.test(line);
    if (!isItem) continue;

    const m = line.match(linkRe);
    if (!m) continue;

    const title = m[1].replace(/[*_`]/g, "").trim();
    const url = absolutize(m[2].trim());

    // Only keep entries that point at real corpus content (pages or .md),
    // skip nav/feed/utility links. Match on the URL *path* (host-agnostic:
    // works for apex, www, or a mirror), against the known collections.
    let pathname;
    try {
      pathname = new URL(url).pathname;
    } catch {
      continue;
    }
    const isContent =
      /^\/(essays|papers|posts|notes|letters|speeches|books)\/[^/]+/i.test(
        pathname,
      );
    if (!isContent) continue;

    // Abstract = text after the link on the same line, cleaned up.
    const after = line
      .slice(line.indexOf(m[0]) + m[0].length)
      .replace(/^[\s—–:·|.-]+/, "")
      .replace(/[*_`]/g, "")
      .trim();

    const mdUrl = url.endsWith(".md") ? url : `${url.replace(/\/$/, "")}.md`;
    const pageUrl = url.replace(/\.md$/, "");

    entries.push({ title, section, pageUrl, mdUrl, abstract: after || "" });
  }

  // De-dupe by page URL (llms.txt may list a piece under both a concept and
  // an essay section).
  const seen = new Map();
  for (const e of entries) {
    const prev = seen.get(e.pageUrl);
    if (!prev || (!prev.abstract && e.abstract)) seen.set(e.pageUrl, e);
  }
  return [...seen.values()];
}

async function getIndex() {
  const md = await fetchText(INDEX_URL);
  return parseIndex(md);
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

function scoreEntry(entry, terms) {
  const hayTitle = entry.title.toLowerCase();
  const hayAbs = entry.abstract.toLowerCase();
  const haySection = entry.section.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (hayTitle.includes(t)) score += 5;
    if (hayAbs.includes(t)) score += 2;
    if (haySection.includes(t)) score += 1;
  }
  return score;
}

/* ------------------------------------------------------------------ */
/* Tool definitions                                                    */
/* ------------------------------------------------------------------ */

const TOOLS = [
  {
    name: "list_corpus",
    description:
      "List every piece in the jedanderson.org corpus (title, section, URL, " +
      "abstract). Use this to see the full body of work on environmental " +
      "superintelligence and information physics. " +
      PERMISSION_NOTE,
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          description:
            "Optional filter, matched case-insensitively against the section " +
            "name (e.g. 'essays', 'foundational', 'treatises', 'books', 'talks').",
        },
      },
    },
  },
  {
    name: "search_corpus",
    description:
      "Search the jedanderson.org corpus by keyword or phrase across titles, " +
      "abstracts, and sections. Returns the most relevant pieces with their " +
      "URLs so you can then read them in full. " +
      PERMISSION_NOTE,
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords or a phrase to search for." },
        limit: { type: "number", description: "Max results to return (default 10)." },
      },
      required: ["query"],
    },
  },
  {
    name: "read_piece",
    description:
      "Fetch the full Markdown text of a single corpus piece. Accepts either a " +
      "full jedanderson.org URL or a slug/title fragment (which is resolved " +
      "against the index). Returns the complete essay/paper for quotation and " +
      "citation. " +
      PERMISSION_NOTE,
    inputSchema: {
      type: "object",
      properties: {
        ref: {
          type: "string",
          description:
            "A jedanderson.org URL (with or without .md), a slug, or a title " +
            "fragment identifying the piece to read.",
        },
      },
      required: ["ref"],
    },
  },
  {
    name: "get_corpus_overview",
    description:
      "Return the corpus's own AI-readable index (llms.txt) verbatim: the " +
      "curated map of named concepts, foundational treatises, essays, books, " +
      "and talks with abstracts. Best single call to understand the whole body " +
      "of work at once. " +
      PERMISSION_NOTE,
    inputSchema: { type: "object", properties: {} },
  },
];

/* ------------------------------------------------------------------ */
/* Tool handlers                                                       */
/* ------------------------------------------------------------------ */

async function handleList(args) {
  const index = await getIndex();
  let entries = index;
  if (args?.section) {
    const s = String(args.section).toLowerCase();
    entries = entries.filter((e) => e.section.toLowerCase().includes(s));
  }
  const body = entries
    .map(
      (e) =>
        `- ${e.title}${e.section ? ` [${e.section}]` : ""}\n  ${e.pageUrl}\n  ${
          e.abstract || "(no abstract)"
        }`,
    )
    .join("\n");
  return `${entries.length} pieces in the jedanderson.org corpus:\n\n${body}\n\n${PERMISSION_NOTE}`;
}

async function handleSearch(args) {
  const query = String(args?.query || "").trim();
  if (!query) throw new Error("query is required");
  const limit = Number(args?.limit) > 0 ? Number(args.limit) : 10;
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const index = await getIndex();
  const ranked = index
    .map((e) => ({ e, score: scoreEntry(e, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (ranked.length === 0) {
    return `No matches for "${query}". Try broader terms, or call get_corpus_overview to see the full map.\n\n${PERMISSION_NOTE}`;
  }
  const body = ranked
    .map(
      (r) =>
        `- ${r.e.title}${r.e.section ? ` [${r.e.section}]` : ""}\n  ${r.e.pageUrl}\n  ${
          r.e.abstract || "(no abstract)"
        }`,
    )
    .join("\n");
  return `Top ${ranked.length} matches for "${query}":\n\n${body}\n\nRead any piece in full with read_piece.\n\n${PERMISSION_NOTE}`;
}

async function handleRead(args) {
  const ref = String(args?.ref || "").trim();
  if (!ref) throw new Error("ref is required");

  let mdUrl;
  if (/^https?:\/\//i.test(ref)) {
    mdUrl = ref.endsWith(".md") ? ref : `${ref.replace(/\/$/, "")}.md`;
  } else {
    const index = await getIndex();
    const needle = ref.toLowerCase().replace(/\.md$/, "");
    const match =
      index.find((e) => e.pageUrl.toLowerCase().endsWith(`/${needle}`)) ||
      index.find((e) => e.pageUrl.toLowerCase().includes(needle)) ||
      index.find((e) => e.title.toLowerCase().includes(needle));
    if (!match)
      throw new Error(
        `Could not resolve "${ref}". Use list_corpus or search_corpus to find the exact piece.`,
      );
    mdUrl = match.mdUrl;
  }

  const text = await fetchText(mdUrl);
  return `Source: ${mdUrl}\n${PERMISSION_NOTE}\n\n---\n\n${text}`;
}

async function handleOverview() {
  const md = await fetchText(INDEX_URL);
  return `${PERMISSION_NOTE}\n\n---\n\n${md}`;
}

/* ------------------------------------------------------------------ */
/* Wire up the server                                                  */
/* ------------------------------------------------------------------ */

const server = new Server(
  { name: "jedanderson-corpus", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  try {
    let text;
    switch (name) {
      case "list_corpus":
        text = await handleList(args);
        break;
      case "search_corpus":
        text = await handleSearch(args);
        break;
      case "read_piece":
        text = await handleRead(args);
        break;
      case "get_corpus_overview":
        text = await handleOverview();
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text }] };
  } catch (err) {
    return { isError: true, content: [{ type: "text", text: `Error: ${err.message}` }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("jedanderson-corpus-mcp running (stdio). Corpus: " + SITE);
