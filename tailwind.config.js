/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#363753',
        gris: '#DFE3EE',
        blank: '#FEFEFE',
        green: '#5CD2C6'
      }
    },
  },
  plugins: [],
}

