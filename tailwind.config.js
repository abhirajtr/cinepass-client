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
          10: '#191919',
          11: '#1c1c1c',
          15: '#262626',
          20: '#333333',
          30: '#4C4C4D',
          35: '#59595A',
          40: '#656567',
          60: '#98989A',
          70: '#B3B3B3',
          75: '#BFBFBF',

        },
        green: {
          60: '#CAFF33',
          65: '#D1FF4C',
          70: '#D8FF66',
          80: '#E5FF99',
          90: '#F2FFCC',
          95: '#F8FFE5',
          97: '#FBFFF0',
          99: '#FEFFFA'
        },
        absolute: {
          'white': '#FFF',
          'black': '#000'
        },
        white: {
          90: '#E4E4E7',
          95: '#F1F1F3',
          97: '#F7F7F8',
          99: '#FCFCFD'
        }
      },
    },
  },
  plugins: [],
};
