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

module.exports = {
  content: [
    './src/**/*.vue',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: prefectPalette[500],
        prefect: prefectPalette,
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
        mono: ['InconsolataVariable', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [forms],
}
