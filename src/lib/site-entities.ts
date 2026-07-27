// Canonical schema.org entity definitions for jedanderson.org.
//
// These objects are emitted as JSON-LD on every page by BaseLayout so
// that entity-resolution systems (search engines, AI ingest pipelines)
// build a consistent graph: one Person node for Jed Anderson, one
// Organization node for EnviroAI, one WebSite node for jedanderson.org.
// Each is given a stable @id URI; per-page Article/ScholarlyArticle
// schemas reference them via @id rather than redeclaring identity.
//
// Update rule: add facts only if they trace to a real, verifiable
// source (site-config.ts, frontmatter, About body, or a documented
// external URL). Do not invent affiliations or roles. Omit a field
// rather than guess.

import { SITE } from '../site-config';

// Canonical Person.description — short, entity-anchored, three-phase
// framing. Mirrors the "Arc" timeline on /about: working within the
// system (1998–2005), reforming it (2005–2017), transforming it via
// EnviroAI (2017–present). Replaces an earlier long-form bio
// paragraph; kept terse so search engines and AI ingest pipelines
// surface the credential structure, not prose.
export const JED_DESCRIPTION =
  '27-year arc across three phases—working within the environmental regulatory system, attempting to reform it through the first complete U.S. redraft of the Clean Air Act, and now building environmental superintelligence at EnviroAI.';

export const JED_ID = `${SITE.url}/about#jed-anderson`;
export const ENVIROAI_ID = 'https://enviro.ai/#enviroai';
export const WEBSITE_ID = `${SITE.url}/#website`;

// Canonical glossary of named concepts coined and developed across the
// corpus. Pages with a `defined_term` frontmatter field emit a
// schema.org DefinedTerm that points back to this set via
// `inDefinedTermSet`, binding the term to the corpus and its author.
export const GLOSSARY_ID = `${SITE.url}/#corpus-glossary`;

// ORCID is the canonical researcher identifier for Jed Anderson. It is
// the same iD recorded against every Zenodo deposit (scripts/
// zenodo-deposit.mjs), so declaring it here lets entity-resolution and
// scholarly-graph systems unify the on-site Person node with the
// off-site ORCID and Zenodo records.
export const JED_ORCID = '0009-0003-1807-2459';
export const JED_ORCID_URL = `https://orcid.org/${JED_ORCID}`;

export const enviroaiOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ENVIROAI_ID,
  name: 'EnviroAI',
  url: 'https://enviro.ai',
  founder: { '@id': JED_ID },
  description:
    'Houston-based company building environmental superintelligence—a physics-grounded, real-time information infrastructure for the biosphere.',
  // Canonical external identity for the Organization. enviro.ai is the
  // company's primary domain (also its `url`); declaring it under sameAs
  // gives entity-resolution systems an explicit identity anchor.
  sameAs: ['https://enviro.ai'],
};

export const jedPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': JED_ID,
  name: SITE.author,
  url: SITE.url,
  description: JED_DESCRIPTION,
  jobTitle:
    'Creator and CEO, EnviroAI; Environmental Attorney, The AL Law Group; Adjunct Professor of Law, University of Houston Law School',
  email: `mailto:${SITE.email}`,
  worksFor: { '@id': ENVIROAI_ID },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Baylor Law School',
      url: 'https://www.baylor.edu/law/',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'St. Olaf College',
      url: 'https://wp.stolaf.edu/',
    },
  ],
  affiliation: [
    {
      '@type': 'Organization',
      name: 'University of Houston Law School',
      url: 'https://www.law.uh.edu/',
    },
    {
      '@type': 'Organization',
      name: 'The AL Law Group PLLC',
    },
  ],
  knowsAbout: [
    'environmental law',
    'Clean Air Act',
    'information physics',
    'environmental intelligence',
    'environmental artificial intelligence',
    'environmental superintelligence',
    'artificial intelligence',
    'thermodynamics of information',
    'environmental policy',
  ],
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'Texas State Bar',
      value: '24006759',
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      value: JED_ORCID,
      url: JED_ORCID_URL,
    },
  ],
  author: {
    '@type': 'Book',
    name: 'A Victorious Defeat: 10 Years Reforming the Clean Air Act',
    datePublished: '2016-07-16',
    isbn: '9781535328517',
    url: 'https://www.amazon.com/Victorious-Defeat-Years-Reforming-Clean/dp/1535328517',
    publisher: {
      '@type': 'Organization',
      name: 'CreateSpace Independent Publishing Platform',
    },
  },
  subjectOf: [
    {
      '@type': 'PodcastEpisode',
      name: 'AI and the Environment: Balancing Demands, Challenges, and Opportunities',
      url: 'https://www.eli.org/podcasts/ai-and-environment-balancing-demands-challenges-and-opportunities',
      datePublished: '2024-12-18',
      partOfSeries: {
        '@type': 'PodcastSeries',
        name: 'People, Places and Planet',
        publisher: {
          '@type': 'Organization',
          name: 'Environmental Law Institute',
          url: 'https://www.eli.org',
        },
      },
    },
    {
      '@type': 'PodcastEpisode',
      name: 'Artificial Intelligence for Environmental Compliance',
      url: 'https://www.eli.org/podcasts/artificial-intelligence-environmental-compliance',
      datePublished: '2022-11-30',
      partOfSeries: {
        '@type': 'PodcastSeries',
        name: 'People, Places and Planet',
        publisher: {
          '@type': 'Organization',
          name: 'Environmental Law Institute',
          url: 'https://www.eli.org',
        },
      },
    },
    {
      '@type': 'NewsArticle',
      headline: "TCEQ won't pursue foreign smog relief",
      url: 'https://www.chron.com/news/houston-texas/article/tceq-won-t-pursue-foreign-smog-relief-2081036.php',
      publisher: {
        '@type': 'Organization',
        name: 'Houston Chronicle',
        url: 'https://www.chron.com',
      },
      datePublished: '2011-05',
    },
    {
      '@type': 'NewsArticle',
      headline:
        'Lawyer wants Texans not to pay for smog from Mexico, elsewhere',
      url: 'https://www.beaumontenterprise.com/news/sciencehealth/article/lawyer-wants-texans-not-to-pay-for-smog-from-1391461.php',
      publisher: {
        '@type': 'Organization',
        name: 'Beaumont Enterprise',
        url: 'https://www.beaumontenterprise.com',
      },
      datePublished: '2011-05',
    },
    {
      '@type': 'NewsArticle',
      headline: 'Texas lawyer wants extra pollution controls nixed',
      url: 'https://victoriaadvocate.com/2011/05/23/texas-lawyer-wants-extra-pollution-controls-nixed/',
      publisher: {
        '@type': 'Organization',
        name: 'Victoria Advocate',
        url: 'https://victoriaadvocate.com',
      },
      datePublished: '2011-05-23',
    },
    {
      '@type': 'NewsArticle',
      headline:
        'Can AI reshape how we regulate air and water? Rice event explores future of environmental superintelligence',
      url: 'https://news.rice.edu/news/2026/can-ai-reshape-how-we-regulate-air-and-water-rice-event-explores-future-environmental',
      publisher: {
        '@type': 'Organization',
        name: 'Rice University News',
        url: 'https://news.rice.edu',
      },
      datePublished: '2026-02-26',
    },
    {
      '@type': 'NewsArticle',
      headline: 'Supporting the environment, one internet search at a time',
      url: 'https://wp.stolaf.edu/news/supporting-the-environment-one-internet-search-at-a-time',
      publisher: {
        '@type': 'Organization',
        name: 'St. Olaf College',
        url: 'https://wp.stolaf.edu',
      },
      datePublished: '2023-01-13',
    },
    {
      '@type': 'VideoObject',
      name: 'Interview at the 2022 Gulf Coast Industry Forum',
      url: 'https://www.youtube.com/watch?v=gwfOWruLbW0',
      // uploadDate is YouTube's own recorded date for the video;
      // thumbnailUrl is the canonical YouTube thumbnail for the ID.
      // Both required for the node to validate as a Video item in
      // Google's Rich Results Test.
      uploadDate: '2022-09-29',
      thumbnailUrl: 'https://i.ytimg.com/vi/gwfOWruLbW0/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/gwfOWruLbW0',
      publisher: {
        '@type': 'Organization',
        name: 'Economic Alliance Houston Port Region',
      },
    },
    // Past talks are modeled as Article, never Event: Google requires
    // Event markup to describe an upcoming attendable happening with a
    // location, and flags past-talk Event nodes in Search Console. The
    // @id matches the Article the on-site speech page emits, so the two
    // nodes unify into one entity in the graph; sameAs keeps the link
    // to the host organization's event page.
    {
      '@type': 'Article',
      '@id': `${SITE.url}/speeches/awma-webinar-ai-in-environmental-field#article`,
      headline: 'AI in the Environmental Field',
      description:
        "Webinar for the Air & Waste Management Association on AI's emerging role in environmental compliance, permitting, and protection work.",
      author: { '@id': JED_ID },
      datePublished: '2025-12-03',
      url: `${SITE.url}/speeches/awma-webinar-ai-in-environmental-field`,
      mainEntityOfPage: `${SITE.url}/speeches/awma-webinar-ai-in-environmental-field`,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      sameAs: 'https://www.awma.org/content.asp?contentid=943',
    },
    {
      '@type': 'Article',
      headline: 'The Disappearing Distinction',
      url: 'https://www.eli.org/the-environmental-forum/disappearing-distinction',
      publisher: {
        '@type': 'Organization',
        name: 'Environmental Law Institute Environmental Forum',
        url: 'https://www.eli.org',
      },
      datePublished: '2012-11',
      author: { '@id': JED_ID },
      isPartOf: {
        '@type': 'PublicationVolume',
        volumeNumber: '29',
        isPartOf: {
          '@type': 'Periodical',
          name: 'The Environmental Forum',
        },
      },
    },
    {
      '@type': 'Article',
      '@id': `${SITE.url}/speeches/afpm-2023-environmental-conference#article`,
      headline:
        'The Advent of Artificial Intelligence in Environmental Management',
      description:
        'General Session at the American Fuel and Petrochemical Manufacturers Environmental Conference on the impacts, opportunities, and risks of AI in environmental management for the fuels refining and petrochemical industry.',
      author: { '@id': JED_ID },
      datePublished: '2023-10-17',
      url: `${SITE.url}/speeches/afpm-2023-environmental-conference`,
      mainEntityOfPage: `${SITE.url}/speeches/afpm-2023-environmental-conference`,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      sameAs: 'https://www.afpm.org/events/ENV23',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/jed-anderson/',
    'https://enviro.ai',
    JED_ORCID_URL,
    'https://www.wikidata.org/wiki/Q140265360',
    // Author-identity pages only. SSRN author profile, Hugging Face
    // user profile, and GitHub account are person-level identifiers;
    // dataset/work/repo URLs never go in Person.sameAs.
    'https://ssrn.com/author=12031408',
    'https://huggingface.co/jedanderson',
    'https://github.com/jedanderson432',
    // TODO: add Google Scholar profile once the account exists, e.g.
    // 'https://scholar.google.com/citations?user=XXXXXXXXXXXX',
  ].filter(Boolean),
};

// The corpus glossary as a schema.org DefinedTermSet. Emitted alongside
// the per-page DefinedTerm on any page that sets `defined_term`. The
// reciprocal `DefinedTerm.inDefinedTermSet` link points here by @id.
export const corpusGlossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': GLOSSARY_ID,
  name: 'Key Named Concepts',
  description:
    "The controlled vocabulary of concepts coined and developed across Jed Anderson's corpus on environmental superintelligence, information physics, and faith-integrated first-principles thinking.",
  url: `${SITE.url}/llms.txt`,
  creator: { '@id': JED_ID },
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.title,
  description: SITE.description,
  author: { '@id': JED_ID },
  inLanguage: 'en',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  // Pagefind search, deep-linkable via /?q=term (SearchModal opens and
  // runs the query on load). The SearchAction makes the site search
  // machine-discoverable (sitelinks search box, agent navigation).
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.url}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// The three site-wide JSON-LD nodes, in a stable order, emitted on
// every page by BaseLayout. Per-page schemas (Article, ScholarlyArticle,
// ProfilePage) are concatenated alongside these.
export const siteEntitySchemas = [
  jedPersonSchema,
  enviroaiOrganizationSchema,
  websiteSchema,
];
