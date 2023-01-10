/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const ColorPaletteKeys = ['DEFAULT', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
type ColorPalette = Partial<Record<typeof ColorPaletteKeys[number], string>>

// Think of foreground/background palette scales as scales of intensity from a starting color
const generateColorPalette = (base: string): ColorPalette => {
  const colors: ColorPalette = {
    DEFAULT: `hsl(var(--${base}) / <alpha-value>)`,
  }
  ColorPaletteKeys.forEach((key) => colors[key] = `hsl(var(--${base}-${key}) / <alpha-value>)`)
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

export const config = {
  darkMode,
  plugins,
  theme: {
    extend,
  },
}

export default plugin(PrefectDesign, config)