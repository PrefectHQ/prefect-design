const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')

// Think of foreground/background palette scales as scales of intensity from a starting color
const generateColorPalette = (base) => {
  const colors = {
    DEFAULT: `hsl(var(--${base}) / <alpha-value>)`,
  }
  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  keys.forEach((key) => colors[key] = `hsl(var(--${base}-${key}) / <alpha-value>)`)
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

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.vue',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
        mono: ['InconsolataVariable', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [forms],
}
