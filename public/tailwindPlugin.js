/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const borderRadius = {
  default: 'var(--p-radius-default)',
}

const colors = {
  divider: 'var(--p-color-divider)',
  'selectable-hover': 'var(--p-color-selectable-hover)',
  'focus-ring': 'var(--p-color-focus-ring)',
  'focus-ring-offset': 'var(--p-color-focus-ring-offset)',
  live: 'var(--p-color-live)',
  'sentiment-positive': 'var(--p-color-sentiment-positive)',
  'sentiment-neutral': 'var(--p-color-sentiment-neutral)',
  'sentiment-negative': 'var(--p-color-sentiment-negative)',
}

const spacing = {
  'spacing-focus-ring': 'var(--p-spacing-focus-ring)',
}

const ringWidth = {
  'spacing-focus-ring': 'var(--p-spacing-focus-ring)',
}

const ringOffsetWidth = {
  'focus-ring': 'var(--p-spacing-focus-ring-offset)',
}

const fontFamily = {
  sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
  mono: ['InconsolataVariable', ...defaultTheme.fontFamily.mono],
}
const extend = {
  borderRadius,
  colors,
  spacing,
  ringWidth,
  ringOffsetWidth,
  fontFamily,
}
const plugins = [forms]
const darkMode = 'class'

function PrefectDesign() {
  /* */
}

const config = {
  darkMode,
  plugins,
  theme: {
    extend,
  },
}

module.exports = plugin(PrefectDesign, config)