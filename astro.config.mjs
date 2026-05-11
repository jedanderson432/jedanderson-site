import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkCustomHeadingId from 'remark-custom-heading-id';
import { validateSlugs } from './scripts/validate-slugs.mjs';

// Inline integration that gates dev/build/sync on slug well-formedness.
// Failure throws with the offending files listed.
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
    sitemap(),
    tailwind({ applyBaseStyles: true }),
    mdx(),
  ],
});
