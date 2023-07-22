/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    "./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing:{
        '128':'400px',
        '264':"660px"
        
      }
    },
  },
  plugins: [],
}