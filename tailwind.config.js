/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          primary: '#0f172a10',
          secondary: '#1E293B',
          accent: '#9d4edd',
          light: '#E2E8F0',
        },
      },
    },
  },
  plugins: [],
}

