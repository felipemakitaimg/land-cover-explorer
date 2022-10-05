const colors = require('tailwindcss/colors')

module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      custom: {
        'light-blue': {
          DEFAULT: '#BFEEFF',
          90: 'rgba(191,238,255, .9)',
          80: 'rgba(191,238,255, .8)',
          50: 'rgba(191,238,255, .5)'

        },
        'background': {
          DEFAULT: 'rgb(0,35,47)',
          95: 'rgba(0,35,47, .95)',
          90: 'rgba(0,35,47, .9)',
          85: 'rgba(0,35,47, .85)',
          70: 'rgba(0,35,47, .7)',
        }
      }
    },
    extend: {
      // height: {
      //   'control-panel': '210px'
      // },
      spacing: {
        'control-panel-height': '210px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
