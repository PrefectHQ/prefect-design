/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

const prefectUtilities = {
  '.bg-floating': { backgroundColor: 'var(--p-color-bg-floating)' },
  '.bg-code': { backgroundColor: 'var(--p-color-bg-code)' },
  '.bg-fullscreen-cover': { backgroundColor: 'var(--p-color-bg-fullscreen-cover)' },
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

module.exports = plugin(({ addUtilities }) => {
  addUtilities(prefectUtilities)
})