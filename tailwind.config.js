// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          10:'#191919',
          11: '#1c1c1c',
          15: '#262626',
          30: '#4C4C4D',
          70: '#B3B3B3',

        },
        green: {
          60: '#CAFF33',
        },
        absolute: {
          'white': '#FFF'
        },
        white:{
          '90': '#E4E4E7',
        }
      },
    },
  },
  plugins: [],
};
