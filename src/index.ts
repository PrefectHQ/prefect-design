import '@/styles/index.css'
import type { Plugin, App } from 'vue'

export * from '@/components'
export * from '@/compositions'
export * from '@/layouts'
export * from '@/models'
export * from '@/plugins'
export * from '@/types'
export * from '@/utilities'

import { installs } from '@/components'
import { layouts } from '@/layouts'
import { plugins } from '@/plugins'

const plugin = {
  install(app: App) {
    installs.forEach(install => install(app))
    layouts.forEach(install => install(app))
    plugins.forEach(install => install(app))
  },
} satisfies Plugin

export { plugin }