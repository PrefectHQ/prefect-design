import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'
import { tailwindPlugin } from '@/tailwindPlugin'

const plugins = [
  forms,
  tailwindPlugin,
]

export default {
  content: [
    './src/**/*.vue',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  plugins,
} satisfies Config