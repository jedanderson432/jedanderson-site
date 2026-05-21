# Analytics

The site uses **Netlify Analytics** — a server-side, log-based product. There is no client-side tracking JavaScript on jedanderson.org. No cookies are set for analytics. No third-party scripts. Visitors and crawlers are counted by parsing Netlify's edge access logs, which means every request is captured regardless of whether the client executes JavaScript — including the AI crawlers we care most about.

## Activation

Netlify Analytics is enabled per-site, from the dashboard: `app.netlify.com` → select the site → **Analytics** tab → **Enable** ($9/month per site). It cannot be toggled from the CLI or `netlify.toml`. There is nothing to wire up in this repo — once it's on, it backfills 30 days of historical log data and continues automatically.

If Netlify has reorganized the UI and "Analytics" no longer lives as a top-level tab, check **Site configuration → Analytics** as a fallback.

## What it captures

Netlify Analytics reports, per site, per time range:

- **Pageviews** — unique and total, server-side counted from log entries.
- **Top pages** — most-requested HTML routes.
- **Top resources** — the full URL hit list, including non-HTML assets (PDFs, markdown endpoints, sitemap, robots.txt, llms.txt). This is the most useful view for AI ingestion analysis.
- **Top sources / referrers** — the `Referer` header on incoming requests. This is where you see where the corpus is being cited or linked from.
- **Top countries** — by client IP geolocation.
- **Bandwidth served** — total bytes out.
- **Top user-agents** — the breakdown that reveals bot traffic, including the AI crawlers below.
- **Not found (404) requests** — useful for catching broken external links into the corpus.

## Why this is the leading indicator

The 25-year findability goal is about whether the corpus gets ingested into the substrate that future agents will retrieve from. AI ingestion of the corpus is the **primary signal**. Human pageviews are secondary — interesting, but lagging.

Concretely:

- A spike in `ClaudeBot` or `GPTBot` traffic on a specific essay is a leading indicator that the piece is being pulled into training or retrieval corpora. That matters more than a spike in human visits, because human visits are bounded by audience size while crawler ingestion compounds across every future agent built on top of those corpora.
- A new referrer appearing in **Top sources** is a leading indicator that the corpus is being cited or linked from a new venue — often a Substack, a paper, a forum thread, or an LLM output that included a citation a user then clicked through.
- A new high-frequency hit on a specific `.md` endpoint (raw markdown) in **Top resources** is a leading indicator that some retrieval pipeline has discovered the markdown-by-appending-`.md` convention and is pulling the corpus that way. Encourage this — that endpoint exists for them.

Pageview counts are a vanity metric in this context. The user-agent breakdown and the resource hit list are the real ones.

## AI crawlers to watch for

These are the user-agents that should show up in the Netlify **Top user-agents** breakdown as the corpus gets ingested. All of them are explicitly `Allow: /` in [`public/robots.txt`](../public/robots.txt):

| User-agent | Operator | Purpose |
|---|---|---|
| `ClaudeBot` | Anthropic | Training corpus crawler |
| `Claude-User` | Anthropic | User-initiated retrieval (Claude fetching a page on a user's behalf) |
| `Claude-SearchBot` | Anthropic | **Retrieval-layer crawler — indexes content quality for Claude's search-style answers. The most important Anthropic bot for the site's 25-year findability goal.** |
| `GPTBot` | OpenAI | Training corpus crawler |
| `OAI-SearchBot` | OpenAI | Search index for ChatGPT search results |
| `ChatGPT-User` | OpenAI | User-initiated retrieval (ChatGPT fetching a page) |
| `PerplexityBot` | Perplexity | Search and retrieval crawler |
| `Perplexity-User` | Perplexity | User-initiated retrieval |
| `Google-Extended` | Google | Opt-in token for Gemini / Vertex training |
| `CCBot` | Common Crawl | Open crawl that feeds most foundation model training sets — high leverage |
| `Bytespider` | ByteDance | Doubao / training |
| `Amazonbot` | Amazon | Alexa, Nova / training |

### Anthropic's three-bot framework

Anthropic now operates three distinct crawlers, each with a clear purpose: `ClaudeBot` (training), `Claude-User` (user-initiated retrieval), and `Claude-SearchBot` (search-index retrieval). Of these, `Claude-SearchBot` is the most consequential for the 25-year findability goal — when Claude answers in search-style mode, it draws from the index this bot builds, so a corpus that ranks well here is a corpus that gets cited.

The older `anthropic-ai` and `Claude-Web` user-agents are **deprecated**, replaced by the three-bot framework above. They may still appear in logs occasionally; `Claude-Web` is kept in the `robots.txt` explicit-allow list out of caution, but `anthropic-ai` has been removed.

The `robots.txt` file also allows a longer tail: `Applebot-Extended`, `cohere-ai`, `meta-externalagent`, `MistralAI-User`. Watch for those too as they emerge.

## Where to find this in the Netlify UI

- **Top resources** → all URLs hit, sorted by request count. This is where you see which essays are being pulled most, including the `.md` endpoints.
- **Top user-agents** (under the same Analytics view, sometimes labeled "Top user agents" or grouped under a "Bots" filter depending on UI version) → the bot breakdown. Cross-reference with the table above.
- **Top sources** → referrers. Look for unexpected new domains.
- **Not found** → 404s. If an AI crawler is hitting an old URL that no longer resolves, that's a sign the corpus is being cited via a stale link and we may want to add a redirect.

## What we don't have, and why

- **No client-side analytics** (no GA, no Plausible script, no Fathom). The corpus is meant to be readable by anything and everything, including agents that don't run JavaScript. Adding a tracking script would (a) bias measurement toward human browsers, (b) add a third-party dependency, and (c) introduce a privacy footprint that conflicts with the site's posture.
- **No cookies for analytics.** Netlify Analytics is purely server-log-based.
- **No per-visitor tracking.** Netlify Analytics aggregates; it does not produce a session-level event stream. That's a feature, not a limitation, given the project's longevity and privacy posture.

If we ever need event-level introspection (e.g., to see which sections of a long essay are being read), we'd add that deliberately and document it here. Until then, server-side aggregates are sufficient — and the AI-crawler signal in the user-agent breakdown is the metric that matters.
