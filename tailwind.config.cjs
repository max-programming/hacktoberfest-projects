/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#ffd74d",
        "primary-2": "#40ddff",
        "primary-3": "#7c7fff",
        primary: "#7c7fff",
        accent: "#170f1e",
        "hero-button-hover": "#b53a25",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
