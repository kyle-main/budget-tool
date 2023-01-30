/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      atom: {
        100: 'f1f2f4',
        200: 'd4d7de',
        300: 'b7bcc8',
        400: '9aa2b1',
        500: '7d879b',
        600: '596273',
        700: '373d48',
        800: '282c34',
        900: '16181d'
      }
    }
  },
  plugins: [],
}
