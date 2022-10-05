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
        "primary-1": '#ffd74d',
        "primary-2": '#40ddff',
        "primary-3": '#7c7fff',
        "primary": '#7c7fff',
        accent: '#170f1e',
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