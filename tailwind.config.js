module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro']
    },
    extend: {
      colors: {
        primary: '#ff5724',
        accent: '#2b3531',
        'hero-button-hover': '#b53a25'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula', 'halloween']
  }
};
