/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const COLOR_PALETTE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Think of foreground/background palette scales as scales of intensity from a starting color
const generateColorPalette = (base) => {
  const colors = {
    DEFAULT: `hsl(var(--${base}) / <alpha-value>)`,
  }
  COLOR_PALETTE_KEYS.forEach((key) => colors[key] = `hsl(var(--${base}-${key}) / <alpha-value>)`)
  return colors
}

const colors = () => {
  return {
    divider: 'var(--p-color-divider)',
    'selectable-hover': 'var(--p-color-selectable-hover)',
    'focus-ring': 'var(--p-color-focus-ring)',
    'focus-ring-offset': 'var(--p-color-focus-ring-offset)',
    live: 'var(--p-color-live)',
    'sentiment-positive': 'var(--p-color-sentiment-positive)',
    'sentiment-neutral': 'var(--p-color-sentiment-neutral)',
    'sentiment-negative': 'var(--p-color-sentiment-negative)',

    /* Legacy imports – to be removed before releasing v2.0 */
    background: generateColorPalette('background'),
    prefect: generateColorPalette('prefect'),
    primary: generateColorPalette('primary'),
    danger: generateColorPalette('danger'),
    success: generateColorPalette('success'),
    foreground: generateColorPalette('foreground'),
  }
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