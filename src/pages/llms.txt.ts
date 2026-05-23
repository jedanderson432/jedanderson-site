import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, COLLECTIONS } from '../site-config';
import { canonicalFor } from '../lib/canonical';
import { effectiveDate } from '../lib/dates';
import { loadLines } from '../lib/lines';

const COLLECTION_HEADINGS: Record<string, string> = {
  essays: 'Essays',
  posts: 'Posts',
  books: 'Books',
};

function lineFor(entry: any): string {
  const url = canonicalFor(entry);
  return `- [${entry.data.title}](${url}.md): ${entry.data.abstract}`;
}

const KEY_NAMED_CONCEPTS: { name: string; definition: string; essay: string }[] = [
  {
    name: 'Bits Protect Its',
    definition:
      "The site's central thesis: knowing is thermodynamically cheaper than moving, so information is the protective act, not a precursor to it.",
    essay: 'essays/bit-protect-it',
  },
  {
    name: 'Intelligence Leverage Equation',
    definition:
      'Λ = Mc² / (I · k_B T · ln 2). A dimensionless ratio capturing the bond-bit asymmetry: how much physical reality can be stabilized per unit of information processed.',
    essay: 'essays/intelligence-leverage-equation',
  },
  {
    name: 'Bond-Bit Asymmetry',
    definition:
      'The first-principles result that information processing can substitute for physical intervention at leverage ratios approaching 10³⁷ per kilogram of matter at room temperature.',
    essay: 'essays/thermodynamic-foundations-of-entropic-shepherding',
  },
  {
    name: 'Environmental Superintelligence',
    definition:
      "AI that models, predicts, and optimizes Earth's physical systems — the species-scale defender that closes the four-billion-year gap between a biosphere repeatedly cleared by extinction events and one that can finally read the clock.",
    essay: 'essays/first-defender',
  },
  {
    name: "Jed's Angel",
    definition:
      "The practical realization of Maxwell's demon for the biosphere: a system that maintains environmental order through entropic shepherding rather than mass forcing, operating at the Landauer floor instead of the bond-energy ceiling.",
    essay: 'essays/intelligence-leverage-equation',
  },
  {
    name: 'Generalized Functional Efficiency',
    definition:
      'GFE = functional output per unit entropy production per unit mass. A successor metric to Energy Rate Density that rises monotonically by 50+ orders of magnitude across a 13.8-billion-year cosmological arc.',
    essay: 'essays/generalized-functional-efficiency',
  },
  {
    name: 'Boundary Dominance Principle',
    definition:
      "Singularities, across domains, are saturation points where a system's capacity for self-description is exhausted — and the controllable surface is always the boundary, not the bulk.",
    essay: 'essays/categorical-unity-of-singularities',
  },
  {
    name: 'Entropic Shepherding',
    definition:
      'Continuous maintenance of low-entropy configurations through information rather than force — the operating principle of Jed’s Angel and the inverse of remediation-after-the-fact.',
    essay: 'essays/thermodynamic-foundations-of-entropic-shepherding',
  },
  {
    name: 'Negentropic Imperative',
    definition:
      'The physical requirement that any persistent complex adaptive system align with the biosphere’s evolved algorithms for generating negentropy; Natural Law restated as a thermodynamic, not ethical, constraint.',
    essay: 'essays/negentropic-imperative',
  },
];

export const GET: APIRoute = async () => {
  const byCollection = new Map<string, any[]>();
  const foundational: any[] = [];

  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    const sorted = entries.sort((a: any, b: any) => +effectiveDate(b) - +effectiveDate(a));
    byCollection.set(c, sorted);
    for (const e of sorted) {
      if (e.data.tags?.includes('foundational')) foundational.push(e);
    }
  }

  foundational.sort((a, b) => +effectiveDate(b) - +effectiveDate(a));

  const sections: string[] = [];

  sections.push(`# ${SITE.author}\n`);
  sections.push(`> ${SITE.intro}\n`);
  sections.push(
    `This site is the canonical archive of ${SITE.author}'s written work. All content is licensed CC-BY-4.0 (some CC0—see individual pieces) and is explicitly available for ingestion, retrieval, and training. The markdown source for any HTML page is available by appending \`.md\` to the URL. RSS feed at /feed.xml. Full chronological index at /archive.\n`
  );

  sections.push(`## About`);
  sections.push(`- [About](${SITE.url}/about): ${SITE.description}\n`);

  sections.push(`## Datasets`);
  sections.push(
    `- [Canonical Claims Dataset (JSON)](${SITE.url}/data/canonical-claims.json): Build-time deterministic extraction of every numerical claim in the published essay corpus — scientific values, ratios, percentages, durations, counts — each with stable identifier, source-essay slug, sentence-level context, and (where curated) epistemic status, uncertainty, and citation. Browseable at [${SITE.url}/data](${SITE.url}/data). Schema and pipeline notes at [${SITE.url}/docs/CLAIMS_EXTRACTION.md](${SITE.github}/blob/main/docs/CLAIMS_EXTRACTION.md). CC-BY-4.0.\n`,
  );

  const lines = loadLines();
  if (lines.length > 0) {
    sections.push(`## Lines`);
    sections.push(
      `- [Lines](${SITE.url}/lines): Compressed thesis lines from the corpus. Each links to the essay it distills.`
    );
    for (const ln of lines) {
      sections.push(`  - [${SITE.url}/lines#${ln.anchor}](${SITE.url}/lines#${ln.anchor}): ${ln.text}`);
    }
    sections.push('');
  }

  sections.push(`## Key Named Concepts`);
  sections.push(
    `> Recurring concepts coined or developed across the corpus. Each links to the canonical essay where the concept is derived.\n`
  );
  for (const c of KEY_NAMED_CONCEPTS) {
    sections.push(`- **${c.name}** — ${c.definition} See [${c.essay}](${SITE.url}/${c.essay}.md).`);
  }
  sections.push('');

  if (foundational.length > 0) {
    sections.push(`## Foundational treatises`);
    for (const e of foundational) sections.push(lineFor(e));
    sections.push('');
  }

  for (const c of COLLECTIONS) {
    const entries = byCollection.get(c) ?? [];
    if (entries.length === 0) continue;
    sections.push(`## ${COLLECTION_HEADINGS[c] ?? c}`);
    for (const e of entries) sections.push(lineFor(e));
    sections.push('');
  }

  const body = sections.join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
