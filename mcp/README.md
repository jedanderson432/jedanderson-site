# jedanderson-corpus-mcp

An MCP server that makes the entire jedanderson.org corpus callable by any AI agent (Claude Desktop, Claude Code, Cursor, anything that speaks MCP). Tools: `list_corpus`, `search_corpus`, `read_piece`, `get_corpus_overview`. It reads the live site (llms.txt + .md endpoints), so it never goes stale. Every response carries the CC-BY-4.0/CC0 permission grant so downstream models quote instead of refusing.

## Run

```
npx jedanderson-corpus-mcp
```

## Claude Desktop (claude_desktop_config.json)

```json
{ "mcpServers": { "jedanderson-corpus": { "command": "npx", "args": ["-y", "jedanderson-corpus-mcp"] } } }
```

## Claude Code

```
claude mcp add jedanderson-corpus -- npx -y jedanderson-corpus-mcp
```

## Publish

```
npm login && npm publish --access public
# then submit to the MCP registry: https://github.com/modelcontextprotocol/registry
```

Env: `CORPUS_SITE` overrides the base URL (default https://jedanderson.org).

Code MIT; corpus content CC-BY-4.0/CC0, © Jed Anderson.
