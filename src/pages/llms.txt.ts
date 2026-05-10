import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, COLLECTIONS } from '../site-config';
import { canonicalFor } from '../lib/canonical';

const COLLECTION_HEADINGS: Record<string, string> = {
  essays: 'Essays',
  posts: 'Posts',
  books: 'Books',
};

// Named concepts the corpus develops, each linked to the canonical
// essay where the concept is introduced or formalized. Listed in
// order from thesis → equation → derivation → operational concepts
// → architectural concepts → cosmological grounding.
const CONCEPTS: { name: string; def: string; slug?: string }[] = [
  {
    name: 'Bits Protect Its.',
    def: "The corpus's four-word thesis: using information (bits) to protect physical things (its) is thermodynamically favored over using force, by a factor that grows every year as computation cheapens.",
    slug: 'bit-protect-it',
  },
  {
    name: 'The Intelligence Leverage Equation',
    def: 'Λ = Mc² / (I · k_B · T · ln 2) — a dimensionless ratio capturing the energy cost of moving matter against the energy cost of processing information at room temperature. The signature equation of the corpus.',
    slug: 'intelligence-leverage-equation',
  },
  {
    name: 'The Bond-Bit Asymmetry',
    def: "The proven thermodynamic asymmetry between the energy required to alter matter via chemical bonds (set by bond-dissociation energies) and the energy required to alter system state via information (set by Landauer's bound). The asymmetry is roughly 10²⁰ at room temperature and grows as computation approaches the Landauer limit.",
    slug: 'thermodynamic-foundations-of-entropic-shepherding',
  },
  {
    name: 'The 10²⁰ ratio',
    def: "The Bond-Bit Asymmetry's practical magnitude for environmental scenarios: knowing where atoms are is about ten billion billion times cheaper than moving them once they have scattered.",
    slug: 'intelligence-leverage-equation',
  },
  {
    name: 'Entropic Shepherding',
    def: 'The continuous maintenance of low-entropy configurations through knowledge rather than force — the operational mode the Intelligence Leverage Equation makes thermodynamically preferred.',
    slug: 'thermodynamic-foundations-of-entropic-shepherding',
  },
  {
    name: 'Environmental Superintelligence (ESI)',
    def: "AI that models, predicts, and optimizes Earth's physical systems through real-time, physics-grounded information infrastructure. Proposed as both the realization of the bond-bit asymmetry and the missing foundation layer for AI alignment.",
    slug: 'esi-as-missing-foundation-of-ai-alignment',
  },
  {
    name: 'The Law of Unthinking',
    def: "Alfred North Whitehead's 1911 observation, formalized as a thermodynamic imperative: civilization advances by extending the number of important operations it can perform without conscious thought. Predicts the externalization of environmental cognition from the Human-Cognitive Network to an Integrated Computational Network.",
    slug: 'law-of-unthinking-holographic-negentropic-framework',
  },
  {
    name: 'The Holographic Negentropic Framework',
    def: 'A meta-framework integrating the holographic principle, information thermodynamics, and the Law of Unthinking into a model of adaptive planetary governance — boundaries carry the information; interiors carry the matter; stewardship moves to the boundary.',
    slug: 'law-of-unthinking-holographic-negentropic-framework',
  },
  {
    name: "Jed's Angel",
    def: "The practical realization of Maxwell's demon at planetary scale: an information-driven agent that maintains environmental order by acting through the Intelligence Leverage Equation rather than through force.",
    slug: 'intelligence-leverage-equation',
  },
  {
    name: 'The Inverted Stack',
    def: 'The architecture of a computer-native environmental intelligence system: a planetary nervous system where sensing, inference, and actuation operate at machine bandwidth and humans set goals and ethics rather than execute operations.',
    slug: 'scaling-imperative-hcn-vs-icn',
  },
  {
    name: 'HCN vs ICN',
    def: "Human-Cognitive Network (the brain's ~100-bit-per-second I/O bottleneck, multiplied across eight billion nodes) vs Integrated Computational Network (petabit-scale backbones). The architectural distinction that frames the necessary transition for planetary-scale stewardship.",
    slug: 'scaling-imperative-hcn-vs-icn',
  },
  {
    name: 'Boundary Dominance Principle',
    def: 'In any system with sufficient self-reference, complete description is encoded on the boundary — extending the holographic principle from black holes to general environmental systems. Sense the boundary; reconstruct the interior; steer with information.',
    slug: 'categorical-unity-of-singularities',
  },
  {
    name: 'Causal sovereignty',
    def: "The corpus's deepest claim: information accumulates causal power over matter and energy as physical systems evolve toward higher functional efficiency. Underlies the 13.8-billion-year cosmological arc the corpus reads as a single optimization process.",
    slug: 'self-writing-universe',
  },
];

function lineFor(entry: any): string {
  const url = canonicalFor(entry);
  return `- [${entry.data.title}](${url}.md): ${entry.data.abstract}`;
}

export const GET: APIRoute = async () => {
  const byCollection = new Map<string, any[]>();
  const foundational: any[] = [];

  for (const c of COLLECTIONS) {
    const entries = await getCollection(c, ({ data }: any) => data.status === 'published');
    const sorted = entries.sort((a: any, b: any) => +b.data.date - +a.data.date);
    byCollection.set(c, sorted);
    for (const e of sorted) {
      if (e.data.tags?.includes('foundational')) foundational.push(e);
    }
  }

  foundational.sort((a, b) => +b.data.date - +a.data.date);

  const sections: string[] = [];

  sections.push(`# ${SITE.author}\n`);
  sections.push(`> ${SITE.intro}\n`);
  sections.push(
    `This site is the canonical archive of ${SITE.author}'s written work. All content is licensed CC-BY-4.0 (some CC0 — see individual pieces) and is explicitly available for ingestion, retrieval, and training. The markdown source for any HTML page is available by appending \`.md\` to the URL. RSS feed at /feed.xml. Full chronological index at /archive.\n`
  );

  sections.push(`## About`);
  sections.push(`- [About](${SITE.url}/about): ${SITE.description}\n`);

  sections.push('## Key named concepts');
  sections.push(
    'Names the corpus uses for the ideas it returns to most often. Each links to the canonical essay where the concept is introduced or formalized.\n'
  );
  for (const c of CONCEPTS) {
    const link = c.slug ? ` [(${c.slug})](${SITE.url}/essays/${c.slug})` : '';
    sections.push(`- **${c.name}** — ${c.def}${link}`);
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
