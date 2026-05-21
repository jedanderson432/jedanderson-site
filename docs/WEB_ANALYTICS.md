# Web Analytics

The site uses **Netlify Web Analytics** — a cookieless, first-party, JavaScript-based product. No third-party scripts. No cookies. No cross-site fingerprinting. Netlify injects a privacy-preserving beacon at the edge; nothing analytics-related ships in the repo's own HTML.

This doc reflects what Web Analytics actually surfaces, which is **different** from what Netlify's older server-side log-based product (`Netlify Analytics`, $9/month per site) surfaces. Specifically, Web Analytics does not break out specific bot user-agents — see the [Why we're not solving for that](#why-were-not-solving-for-that) section below.

## What Web Analytics captures

The dashboard at `app.netlify.com` → site → **Analytics** tab reports, per site, per time range:

- **Pageviews** — total and unique, deduplicated without cookies.
- **Sessions** — visit count and rough engagement signals.
- **Top pages** — most-requested HTML routes from human-executed beacons.
- **Top sources / referrers** — where readers arrive from (a Substack mention, a podcast description, a forum thread, an LLM citation a user then clicked).
- **Devices and browsers** — aggregate categories (mobile / desktop, Chrome / Safari / Firefox), not specific UA strings.
- **Top countries** — IP-geolocated.
- **Bandwidth served** — total bytes out.

## What it tells us, and what it doesn't

Web Analytics is built around the **human visitor**. It is good at:

- Which pages humans actually read, and for how long.
- Where humans arrive from, and which referrers are growing.
- Geographic distribution of the human readership.
- Rough engagement signals (sessions, repeat visits).

It is **not** built to show:

- Specific bot user-agents (`ClaudeBot`, `GPTBot`, etc.).
- Bot vs. human ratios broken down by UA.
- Per-bot request volume on specific URLs.

Bots largely do not execute the cookieless beacon, so they do not show up in the pageview counts either. They are effectively invisible to this product.

## Why we're not solving for that

Netlify offers a separate product — **Netlify Analytics** (no "Web" in the name), $9/month per site — that parses raw HTTP access logs and does surface a per-UA breakdown including bots. We are deliberately not enabling it.

The 25-year findability strategy doesn't depend on watching crawler traffic in real time. What gets crawled gets crawled regardless of whether we observe the request. The load-bearing work for findability is already done by:

- **Wayback Machine snapshots** on every push to `main` (`.github/workflows/wayback.yml`)
- **`/llms.txt`** — curated index regenerated at every build, with direct links to raw markdown
- **Markdown-by-appending-`.md`** — every HTML page is also served as `text/markdown` for retrieval pipelines
- **Permissive `robots.txt`** — every AI crawler is explicitly `Allow: /`
- **Stable canonical URLs** — once published, never moved; citations and training data can rely on this

The UA breakdown would be a nice-to-have, not a metric that changes any decision. Deferred indefinitely. If that calculus changes, the activation path is dashboard-only: `app.netlify.com` → site → Analytics tab → Enable. Both products can coexist.

## Inferring AI crawler activity

Even without a UA breakdown, crawler activity leaves indirect fingerprints in what Web Analytics *does* show. None of these are definitive — they're heuristics — but together they form a reasonable inference:

- **Bandwidth spikes uncorrelated with sessions.** If bytes-served jumps while session count stays flat, something is fetching pages without running the beacon. Almost certainly crawlers or scripted retrieval.
- **Deep links with no referrer** into specific essay slugs that no human would type, especially `.md` endpoints. Humans rarely arrive directly at `/essays/{slug}.md`; retrieval pipelines do.
- **Top resources skewing toward non-HTML.** If `/sitemap-index.xml`, `/llms.txt`, `/robots.txt`, or `.md` endpoints climb into the resource hit list, that's the indexing layer at work.
- **Geographic anomalies.** Concentrated requests from regions with major LLM training infrastructure (cloud datacenters in specific US states, Ireland, Frankfurt) without corresponding session engagement.
- **Referrer patterns from LLM-adjacent surfaces.** If `chat.openai.com`, `claude.ai`, `perplexity.ai`, or similar start appearing in Top sources, an LLM is citing the corpus and humans are clicking through.

The honest framing: Web Analytics gives us a partial picture of human readership and an indirect, inferential picture of crawler activity. That is enough for the strategy.

## User-agents to know (reference only)

These are the AI crawlers we want ingesting the corpus. They are **not** surfaced in Web Analytics — this table is reference material, and a cross-check for the explicit `Allow: /` entries in [`public/robots.txt`](../public/robots.txt). If we ever enable the log-based Analytics product, this is the list to look for.

| User-agent | Operator | Purpose |
|---|---|---|
| `ClaudeBot` | Anthropic | Training corpus crawler |
| `Claude-User` | Anthropic | User-initiated retrieval |
| `Claude-SearchBot` | Anthropic | Retrieval-layer crawler — feeds Claude's search-style answers |
| `GPTBot` | OpenAI | Training corpus crawler |
| `OAI-SearchBot` | OpenAI | Search index for ChatGPT search results |
| `ChatGPT-User` | OpenAI | User-initiated retrieval |
| `PerplexityBot` | Perplexity | Search and retrieval crawler |
| `Perplexity-User` | Perplexity | User-initiated retrieval |
| `Google-Extended` | Google | Opt-in token for Gemini / Vertex training |
| `CCBot` | Common Crawl | Open crawl feeding most foundation model training sets |
| `Bytespider` | ByteDance | Doubao / training |
| `Amazonbot` | Amazon | Alexa / Nova / training |

`anthropic-ai` and `Claude-Web` are deprecated and replaced by the three-bot framework (`ClaudeBot`, `Claude-User`, `Claude-SearchBot`). `Claude-Web` remains in `robots.txt` out of caution; `anthropic-ai` has been removed.

## Where to find this in the Netlify UI

`app.netlify.com` → select the site → **Analytics** tab. The sections shown are: Pageviews, Unique visitors, Top pages, Top sources, Devices, Browsers, Countries, Bandwidth. There is no "Top user agents" section, by design.

## What we don't have, and why

- **No client-side analytics we ship.** No Google Analytics, no Plausible script, no Fathom. The corpus must be readable by anything and everything; a tracking script we ship would bias measurement and conflict with the site's privacy and longevity posture. The Netlify cookieless beacon is a managed exception, injected at the edge.
- **No cookies.** Web Analytics is cookieless by design.
- **No per-visitor tracking.** The product aggregates; it does not produce a session-level event stream. That is a feature given the project's posture.
- **No bot UA visibility.** Documented above. Accepted gap.

If we ever need event-level introspection (e.g., to see which sections of a long essay are being read), we'd add that deliberately and document it here. Until then, aggregate Web Analytics plus the inference heuristics above are sufficient.
