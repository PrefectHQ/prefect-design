const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')

const prefectPalette = {
  50: '#F2F6FF',
  100: '#E6EDFF',
  200: '#C0D3FF',
  300: '#9AB8FE',
  400: '#4E82FE',
  500: '#024DFD',
  600: '#0245E4',
  700: '#023ABE',
  800: '#012E98',
  900: '#01267C',
}

const stateColors = {
  completed: '#2AC769',
  cancelled: '#3D3D3D',
  failed: '#FB4E4E',
  pending: '#EBEEF7',
  running: '#1860F2',
  scheduled: '#FCD14E',
}


module.exports = {
  content: [
    './index.html',
    './demo/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: prefectPalette[500],
        prefect: prefectPalette,
        'state-colors': stateColors,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
}