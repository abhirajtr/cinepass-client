/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-gradient': 'linear-gradient(107deg, rgba(180,180,185,0.15) 0%, rgba(25,25,30,0.9) 58%)',
        'primary-button': 'linear-gradient(107deg, #194BFD 0%, #AD13FB 100%)',
      },
      colors: {
        'bg-dark': "#0A0A0C",         // Primary background color (dark theme)
        'bg-dark-secondary': "#101010",         // Primary background color (dark theme)
        'brand-primary': '#194BFD',   // Main brand color for primary actions, buttons, etc.
        'brand-secondary': '#3313FB', // Secondary brand color for highlights or accent areas
        'text-primary': 'rgba(253, 253, 253, 0.7)',
        'text-muted': 'rgba(230, 230, 230, 0.4)',       // Muted text color for less prominent elements
        'highlight-text': '#E6E6E6',
        'gray-metallic': '#606060',
      }
    },
  },
  plugins: [],
}

