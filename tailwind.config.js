/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ecovest': {
          primary: '#00A651',
          dark: '#008542',
          light: '#00bf5c'
        }
      }
    },
  },
  plugins: [],
};