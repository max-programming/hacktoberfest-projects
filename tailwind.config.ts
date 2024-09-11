import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(30% 50% at center 50%, var(--tw-gradient-stops))'
      },
      backgroundSize: {
        '50': '50%',
        '75': '75%'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT:
          '0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)'
      },
      colors: {
        '2023': {
          'bavarian-red': {
            '1': '#f8bd89',
            '2': '#ec4237',
            '3': '#a3180f',
            '4': '#460a07'
          },
          'bavarian-blue': {
            '1': '#b2e3f0',
            '2': '#33b6d8',
            '3': '#14596b',
            '4': '#0c3640'
          },
          'bavarian-gold': {
            '1': '#fffba4',
            '2': '#d2b863',
            '3': '#ad832d',
            '4': '#382e10'
          },
          manga: {
            '2': '#efedef',
            '3': '#c3bcc3',
            '4': '#655f67'
          },
          void: {
            '2': '#0f0913'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    daisyui,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      );
    }),
    require('tailwindcss-animate')
  ],
  daisyui: {
    base: false
  }
} satisfies Config;

export default config;
