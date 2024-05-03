import { Config } from 'tailwindcss/types/config'
import config from '@/tailwind.config'

export default {
  content: [
    './src/**/*.{vue,js,ts}',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  presets: [config],
} satisfies Config
