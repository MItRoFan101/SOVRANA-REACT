/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d62300',
        secondary: '#3d3d3d',
        accent: '#ffc107',
      },
    },
  },
  plugins: [],
}