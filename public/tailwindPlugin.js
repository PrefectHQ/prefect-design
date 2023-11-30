/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
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
  'sentiment-positive': 'hsl(var(--p-color-sentiment-positive-hsl-values) / <alpha-value>)',
  'sentiment-neutral': 'hsl(var(--p-color-sentiment-neutral-hsl-values) / <alpha-value>)',
  'sentiment-negative': 'hsl(var(--p-color-sentiment-negative-hsl-values) / <alpha-value>)',
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

const darkMode = 'class'

const prefectUtilities = {
  '.bg-floating': { backgroundColor: 'var(--p-color-bg-floating)' },
  '.bg-floating-sticky': { backgroundColor: 'var(--p-color-bg-floating-sticky)' },
  '.bg-code': { backgroundColor: 'var(--p-color-bg-code)' },
  '.bg-overlay': { backgroundColor: 'var(--p-color-bg-overlay)' },
  '.bg-selected': { backgroundColor: 'var(--p-color-selected)' },

  '.border-default': { borderColor: 'var(--p-color-divider)' },
  '.border-selected': { borderColor: 'var(--p-color-selected)' },

  '.text-default': { color: 'var(--p-color-text-default)' },
  '.text-subdued': { color: 'var(--p-color-text-subdued)' },
  '.text-inverse': { color: 'var(--p-color-text-inverse)' },
  '.text-link': { color: 'var(--p-color-text-link)' },
  '.text-code': { color: 'var(--p-color-text-code)' },
  '.text-invalid': { color: 'var(--p-color-text-invalid)' },
  '.text-selected': { color: 'var(--p-color-text-selected)' },

  '.caret-default': { caretColor: 'var(--p-color-text-default)' },
}

function PrefectDesignPlugins({ addUtilities }) {
  addUtilities(prefectUtilities)
}

const config = {
  darkMode,
  theme: {
    extend,
  },
}

module.exports = plugin(PrefectDesignPlugins, config)