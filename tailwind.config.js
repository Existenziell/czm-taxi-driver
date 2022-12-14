module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': '#DBDBDB',
        'brand-dark': '#242424',
        'cta': '#D6A269'
      },
    },
  },
  plugins: [],
}
