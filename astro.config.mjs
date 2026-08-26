import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkCustomHeadingId from 'remark-custom-heading-id';
import { validateSlugs } from './scripts/validate-slugs.mjs';
import { validateClaimsJson } from './scripts/extract-claims.mjs';
import { validateRevisionHistory } from './scripts/validate-revision-history.mjs';
import { validateAssets } from './scripts/validate-assets.mjs';
import { indexNow } from './scripts/indexnow.mjs';
import { buildLastmodMap } from './scripts/sitemap-lastmod.mjs';

// Content frontmatter dates, keyed by canonical path, so the sitemap
// can stamp <lastmod> on every content URL. Built once at config time.
const lastmodMap = await buildLastmodMap();

// Inline integration that gates dev/build/sync on slug well-formedness
// and the canonical-claims.json being present + well-formed. Failure
// throws with the offending files listed.
function slugValidator() {
  return {
    name: 'slug-validator',
    hooks: {
      'astro:config:done': async ({ logger }) => {
        try {
          await validateSlugs();
          logger.info('Slug validation passed.');
        } catch (err) {
          logger.error(err.message);
          throw err;
        }
        try {
          await validateClaimsJson();
          logger.info('Claims dataset validation passed.');
        } catch (err) {
          logger.error(err.message);
          throw err;
        }
        try {
          await validateRevisionHistory();
          logger.info('Revision-history validation passed.');
        } catch (err) {
          logger.error(err.message);
          throw err;
        }
        try {
          const { files, refs } = await validateAssets();
          logger.info(`Asset validation passed (${refs} refs across ${files} files).`);
        } catch (err) {
          logger.error(err.message);
          throw err;
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://jedanderson.org',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  markdown: {
    // Enables Pandoc-style explicit heading IDs: `## Heading {#anchor}`
    remarkPlugins: [remarkCustomHeadingId],
  },
  integrations: [
    slugValidator(),
    sitemap({
      // Stamp <lastmod> on content URLs from frontmatter dates
      // (date_modified ?? date). Non-content pages (home, about, tag
      // indexes) carry no lastmod rather than a fabricated one.
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/+$/, '') || '/';
        const lastmod = lastmodMap.get(pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    tailwind({ applyBaseStyles: true }),
    mdx(),
    // Must run after sitemap() so dist/sitemap-index.xml exists when the
    // astro:build:done hook fires. Fail-soft: never breaks the build.
    indexNow(),
  ],
});
