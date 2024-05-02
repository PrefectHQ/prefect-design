import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import { tailwindPlugin } from '@/tailwindPlugin'

const plugins = [
  animate,
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