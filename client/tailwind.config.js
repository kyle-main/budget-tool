/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        atom: {
          50: '#f1f2f4',
          100: '#d4d7de',
          200: '#b7bcc8',
          300: '#9aa2b1',
          400: '#7d879b',
          500: '#646e82',
          600: '#4e5565',
          700: '#373d48',
          800: '#282c34',
          900: '#16181d'
        }
      }
    }
  },
  plugins: [],
}
