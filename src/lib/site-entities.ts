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

// First paragraph of /about, used as the canonical description on
// the Person node. Kept in sync with the visible About copy.
export const JED_BIO_PARAGRAPH =
  'Jed Anderson is the Creator and CEO of EnviroAI, a Houston-based company building environmental superintelligence—a physics-grounded, real-time information infrastructure for the biosphere. Before EnviroAI, he spent twenty-seven years as an environmental attorney, practicing at Baker Botts and Vinson & Elkins before co-founding The AL Law Group in 2009. He serves as Adjunct Professor of Law at the University of Houston Law School, where he teaches the Clean Air Act, and is the author of A Victorious Defeat: 10 Years Reforming the Clean Air Act (2016).';

export const JED_ID = `${SITE.url}/about#jed-anderson`;
export const ENVIROAI_ID = 'https://enviro.ai/#enviroai';
export const WEBSITE_ID = `${SITE.url}/#website`;

export const enviroaiOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ENVIROAI_ID,
  name: 'EnviroAI',
  url: 'https://enviro.ai',
  founder: { '@id': JED_ID },
  description:
    'Houston-based company building environmental superintelligence—a physics-grounded, real-time information infrastructure for the biosphere.',
};

export const jedPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': JED_ID,
  name: SITE.author,
  url: SITE.url,
  description: JED_BIO_PARAGRAPH,
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
      publisher: {
        '@type': 'Organization',
        name: 'Economic Alliance Houston Port Region',
      },
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/jed-anderson/',
    'https://enviro.ai',
    SITE.github,
  ].filter(Boolean),
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
};

// The three site-wide JSON-LD nodes, in a stable order, emitted on
// every page by BaseLayout. Per-page schemas (Article, ScholarlyArticle,
// ProfilePage) are concatenated alongside these.
export const siteEntitySchemas = [
  jedPersonSchema,
  enviroaiOrganizationSchema,
  websiteSchema,
];
