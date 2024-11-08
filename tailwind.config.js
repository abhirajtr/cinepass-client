// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Absolute Colors
        absolute: {
          white: '#FFFFFF', // Pure white
          black: '#000000', // Pure black
        },

        // Primary Green Shades - Representing Brand Identity
        primary: {
          60: '#CAFF33', // Lighter green
          65: '#D1FF4C',
          70: '#DBFF86',
          80: '#E5FF99',
          90: '#F2FFCC', // Soft green background
          95: '#F8FFE5',
          97: '#FBFFFD',
          99: '#FEFFFA', // Lightest green
        },

        // White Shades - Light Colors for Text Elements
        light: {
          90: '#E4E4E7', // Soft grayish white
          95: '#F1F1F3',
          97: '#F7F7F8',
          99: '#FCFCFD', // Near-white shade
        },

        // Grey Shades - Background and Dark Theme Tones
        neutral: {
          10: '#191919', // Deep black-gray
          11: '#1C1C1C',
          15: '#262626',
          20: '#333333',
          30: '#4C4C4D',
          35: '#59595A',
          40: '#656567',
          60: '#98989A',
          70: '#B3B3B3',
          75: '#BFBFBF', // Lightest neutral gray
        },
        grey: {
          10:'#191919',
          11: '#1c1c1c',
          15: '#262626'
        },
        green: {
          60: '#CAFF33',
        },
        absolute: {
          'white': '#FFF'
        }
      },
    },
  },
  plugins: [],
};
