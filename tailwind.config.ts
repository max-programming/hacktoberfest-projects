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
        hacktoberfest: {
          black: '#1C1C1C',
          green: '#50DA4C',
          pink: '#FF8BFF',
          light: '#FEFDF8',
          beige: '#F3F0E0',
          'dark-green': '#183717',
          'light-green': '#D8FFD8',
          'deep-pink': '#C401C4',
          'light-pink': '#FFDBFF'
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
