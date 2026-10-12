import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Hacktoberfest 2026 type: condensed display, monospace UI, sans body
        display: ['"Barlow Semi Condensed"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter Variable"', 'sans-serif']
      },
      colors: {
        // Sampled from the Hacktoberfest 2026 website
        hf: {
          teal: '#3d5e58',
          'teal-dark': '#2d4743',
          ink: '#10201d',
          cream: '#f7f8f3',
          paper: '#f3f1eb',
          sage: '#e3e5d9',
          coral: '#e97a77',
          red: '#e53827',
          maroon: '#681913',
          yellow: '#f3b924',
          pink: '#f6c3bd',
          blue: '#8bb2de'
        }
      },
      boxShadow: {
        // Hard offset shadow used on Hacktoberfest 2026 buttons and cards
        block: '6px 6px 0 0 #681913',
        'block-sm': '4px 4px 0 0 #681913'
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
