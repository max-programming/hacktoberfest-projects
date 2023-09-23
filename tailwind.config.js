/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        2023: {
          'bavarian-red': {
            1: '#f8bd89',
            2: '#ec4237',
            3: '#a3180f',
            4: '#460a07'
          },
          'bavarian-blue': {
            1: '#b2e3f0',
            2: '#33b6d8',
            3: '#14596b',
            4: '#0c3640'
          },
          'bavarian-gold': {
            1: '#fffba4',
            2: '#d2b863',
            3: '#ad832d',
            4: '#382e10'
          },
          manga: {
            2: '#efedef',
            3: '#c3bcc3',
            4: '#655f67'
          },
          void: {
            2: '#0f0913'
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    base: false
  }
};
