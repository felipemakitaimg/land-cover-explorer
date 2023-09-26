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
          DEFAULT: '#FFFFFF',
          90: 'rgba(255,255,255, .9)',
          80: 'rgba(255,255,255, .8)',
          50: 'rgba(255,255,255, .5)',
          0: 'rgba(255,255,255, .0)'
        },
        'background': {
          DEFAULT: 'rgb(200,85,0)',
          95: 'rgba(200,85,0, .95)',
          90: 'rgba(200,85,0, .9)',
          85: 'rgba(200,85,0, .85)',
          70: 'rgba(200,85,0, .7)',
        },
        'white': {
          DEFAULT: 'rgb(255,255,255)',
        }
      }
    },
    extend: {
      // height: {
      //   'control-panel': '210px'
      // },
      spacing: {
        'control-panel-height': '210px',
        'app-header-size': '40px',
        'app-header-position': '15px',
        'layer-toggle-top-position': '15px',
        'layer-toggle-top-position-mobile': '55px',
        'search-widget-top-position': '50px',
        'search-widget-top-position-mobile': '90px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
