/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbfaf6',     // restrained paper-white background
        ink: '#1a1a1a',       // near-black body text
        muted: '#6b6b6b',     // secondary text
        rule: '#e6e3da',      // hairline rules / borders
        accent: '#7a5a3a',    // single muted accent (warm umber)
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', 'Palatino', 'Georgia', 'serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            a: {
              color: theme('colors.accent'),
              textDecoration: 'underline',
              textUnderlineOffset: '0.2em',
              fontWeight: 'inherit',
            },
            'a:hover': {
              color: theme('colors.ink'),
            },
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.serif').join(', '),
              color: theme('colors.ink'),
            },
            blockquote: {
              borderLeftColor: theme('colors.rule'),
              color: theme('colors.muted'),
              fontStyle: 'italic',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
            },
            hr: {
              borderColor: theme('colors.rule'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
