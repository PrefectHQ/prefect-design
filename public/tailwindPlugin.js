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
    prefect: generateColorPalette('prefect'),
    primary: generateColorPalette('primary'),
    danger: generateColorPalette('danger'),
    success: generateColorPalette('success'),
    foreground: generateColorPalette('foreground'),
    background: generateColorPalette('background'),
  }
}

const fontFamily = {
  sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
  mono: ['InconsolataVariable', ...defaultTheme.fontFamily.mono],
}
const extend = { colors, fontFamily }
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