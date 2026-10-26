import { getCollection } from 'astro:content';
import { SITE } from '../site-config';
import { canonicalFor } from './canonical';
import { effectiveDate } from './dates';

// Two-sentence plain summary that opens /llms.txt, under the title.
const SUMMARY =
  'Jed Anderson writes on environmental superintelligence: the thesis that continuous, physics-grounded information infrastructure can protect the living world at a scale and speed no policy regime reaches. This index lists only the canonical pieces; every page also has a markdown version at its URL plus `.md`.';

function lineFor(entry: any): string {
  const url = canonicalFor(entry);
  // Surface the citable Zenodo concept DOI when present (real, minted
  // DOIs only — empty frontmatter doi fields append nothing).
  const doi = entry.data.doi ? ` (DOI: https://doi.org/${entry.data.doi})` : '';
  // Surface the alternate-venue working-paper posting (e.g. SSRN) when present.
  const ssrn = entry.data.ssrn_url ? ` (SSRN: ${entry.data.ssrn_url})` : '';
  return `- [${entry.data.title}](${url}.md): ${entry.data.abstract}${doi}${ssrn}`;
}

async function published(collection: string): Promise<any[]> {
  const entries = await getCollection(collection as any, ({ data }: any) => data.status === 'published');
  return entries.sort((a: any, b: any) => +effectiveDate(b) - +effectiveDate(a));
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
      'The first-principles result that information processing can substitute for physical intervention at leverage ratios of approximately 10²⁰ for typical environmental scenarios at room temperature.',
    essay: 'essays/thermodynamic-foundations-of-entropic-shepherding',
  },
  {
    name: 'Bond-Bit Ratio',
    definition:
      'The canonical floor ratio (240×) between the Landauer bound at 300 K and one C–H bond enthalpy. The citation-grade form of the Bond-Bit Asymmetry.',
    essay: 'essays/bond-bit-ratio',
  },
  {
    name: 'Environmental Intelligence',
    definition:
      'The capacity to convert the state of the physical environment into understanding precise enough, and timely enough, to act on—sensing, modeling, prediction, and decision joined into one loop. The base term of the ladder that runs through Environmental Artificial Intelligence to Environmental Superintelligence.',
    essay: 'essays/environmental-intelligence',
  },
  {
    name: 'Environmental Artificial Intelligence',
    definition:
      'AI systems built specifically for environmental work—whose models, corpora, and success criteria answer to the state of physical environmental systems rather than to benchmarks. The implementation layer of Environmental Intelligence; matures toward Environmental Superintelligence along continuity, coverage, and closure.',
    essay: 'essays/environmental-artificial-intelligence',
  },
  {
    name: 'Environmental Superintelligence',
    definition:
      "A continuous, physics-grounded information infrastructure that protects the biosphere by modeling, predicting, and stabilizing Earth's physical systems—a human-wielded system that defends rather than supplants, applying the principle that information is thermodynamically cheaper than force (\"bits protect its\").",
    essay: 'essays/environmental-superintelligence',
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

// Build the curated /llms.txt index. It is deliberately selective: the
// full index is /archive and the full text is /llms-full.txt. Section
// order: title and summary, Key Named Concepts, Canonical essays, Books,
// Talks, Data, then pointers to the full index and full text. Every URL
// appears once—a concept whose essay is already linked (or is listed
// under Canonical essays) names the essay without repeating the link.
export async function buildLlmsTxt(): Promise<string> {
  const essays = await published('essays');
  const books = await published('books');
  const talks = await published('speeches');

  // Only essays tagged `canonical`, minus any superseded piece, in
  // editorial order (start_here_order ascending, then newest first).
  const canonical = essays
    .filter((e) => e.data.tags?.includes('canonical') && !e.data.superseded_by)
    .sort((a, b) => {
      const ao = a.data.start_here_order ?? Number.POSITIVE_INFINITY;
      const bo = b.data.start_here_order ?? Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      return +effectiveDate(b) - +effectiveDate(a);
    });
  const canonicalUrls = new Set(canonical.map((e) => `${canonicalFor(e)}.md`));
  const titleBySlug = new Map(essays.map((e) => [`essays/${e.slug}`, e.data.title]));

  const seen = new Set<string>();
  const sections: string[] = [];

  sections.push(`# ${SITE.author}\n`);
  sections.push(`> ${SUMMARY}\n`);

  sections.push(`## Key Named Concepts`);
  sections.push(
    `> Recurring concepts coined or developed across the corpus. Each names the canonical essay where the concept is derived.\n`
  );
  for (const c of KEY_NAMED_CONCEPTS) {
    const url = `${SITE.url}/${c.essay}.md`;
    const title = titleBySlug.get(c.essay) ?? c.essay;
    let ref: string;
    if (canonicalUrls.has(url)) ref = `See *${title}* under Canonical essays.`;
    else if (seen.has(url)) ref = `See *${title}*, linked above.`;
    else {
      ref = `See [${title}](${url}).`;
      seen.add(url);
    }
    sections.push(`- **${c.name}** — ${c.definition} ${ref}`);
  }
  sections.push('');

  const listed = (heading: string, entries: any[]) => {
    const fresh = entries.filter((e) => !seen.has(`${canonicalFor(e)}.md`));
    if (fresh.length === 0) return;
    sections.push(`## ${heading}`);
    for (const e of fresh) {
      seen.add(`${canonicalFor(e)}.md`);
      sections.push(lineFor(e));
    }
    sections.push('');
  };
  listed('Canonical essays', canonical);
  listed('Books', books);
  listed('Talks', talks);

  sections.push(`## Data`);
  sections.push(
    `- [Canonical Claims Dataset (JSON)](${SITE.url}/data/canonical-claims.json): Build-time deterministic extraction of every numerical claim in the published essay corpus — scientific values, ratios, percentages, durations, counts — each with stable identifier, source-essay slug, sentence-level context, and (where curated) epistemic status, uncertainty, and citation. Browseable at [${SITE.url}/data](${SITE.url}/data). Schema and pipeline notes at [${SITE.github}/blob/main/docs/CLAIMS_EXTRACTION.md](${SITE.github}/blob/main/docs/CLAIMS_EXTRACTION.md). CC-BY-4.0.`
  );
  sections.push(
    `- [Lines](${SITE.url}/lines): Compressed thesis lines from the corpus, each linked to the essay it distills.\n`
  );

  sections.push(
    `Full chronological index of every piece: ${SITE.url}/archive. Full text of every published piece in one file: ${SITE.url}/llms-full.txt.`
  );

  return sections.join('\n');
}
