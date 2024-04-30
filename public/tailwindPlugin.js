/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const borderRadius = {
  default: 'var(--p-radius-default)',
}

const borderColor = {
  DEFAULT: 'hsl(var(--p-border) / <alpha-value>)',
}

const colors = {
  'border': 'hsl(var(--p-destructive) / <alpha-value>)',
  'input': 'hsl(var(--p-input) / <alpha-value>)',
  'background': 'hsl(var(--p-background) / <alpha-value>)',
  'primary': 'hsl(var(--p-primary) / <alpha-value>)',
  'primary-foreground': 'hsl(var(--p-primary-foreground) / <alpha-value>)',
  'card': 'hsl(var(--p-card) / <alpha-value>)',
  'card-foreground': 'hsl(var(--p-card-foreground) / <alpha-value>)',
  'destructive': 'hsl(var(--p-destructive) / <alpha-value>)',
  'destructive-foreground': 'hsl(var(--p-destructive-foreground) / <alpha-value>)',
  'accent': 'hsl(var(--p-accent) / <alpha-value>)',
  'accent-foreground': 'hsl(var(--p-accent-foreground) / <alpha-value>)',
  divider: 'var(--p-color-divider)',
  'selectable-hover': 'var(--p-color-selectable-hover)',
  'focus-ring': 'var(--p-color-focus-ring)',
  'focus-ring-offset': 'var(--p-color-focus-ring-offset)',
  live: 'var(--p-color-live)',
  'sentiment-positive': 'hsl(var(--p-positive) / <alpha-value>)',
  'sentiment-neutral': 'hsl(var(--p-neutral) / <alpha-value>)',
  'sentiment-warning': 'hsl(var(--p-warning) / <alpha-value>)',
  'sentiment-negative': 'hsl(var(--p-destructive) / <alpha-value>)',
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

const keyframes = {
  'accordion-down': {
    from: { height: 0 },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0 },
  },
}

const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
}


const extend = {
  borderRadius,
  borderColor,
  colors,
  spacing,
  ringWidth,
  ringOffsetWidth,
  fontFamily,
  keyframes,
  animation,
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