/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')
const prefectDesignTheme = require('./public/tailwindTheme')
const prefectDesignUtilities = require('./public/tailwindUtilities')

const plugins = [
  forms,
  prefectDesignTheme,
  prefectDesignUtilities,
]

module.exports = {
  content: [
    './src/**/*.vue',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  plugins,
}