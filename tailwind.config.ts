import { Config } from 'tailwindcss/types/config'
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import config from './src/tailwind.config'

export default {
  content: [
    './src/**/*.{vue,js,ts}',
    './demo/index.html',
    './demo/**/*.vue',
  ],
  presets: [config],
} satisfies Config
