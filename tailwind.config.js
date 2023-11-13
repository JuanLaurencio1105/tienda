/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',
        darkPrimary: '#1e293b',
        darkSecondary: '#334155',
        lightGreen: '#3bb0ae',
        gris: '#DFE3EE',
        blank: '#FEFEFE',
        green: '#5CD2C6'
      }
    },
  },
  plugins: [],
}

