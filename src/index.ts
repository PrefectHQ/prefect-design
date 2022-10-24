import '@/styles/index.css'

export * from '@/components'
export * from '@/compositions'
export * from '@/layouts'
export * from '@/models'
export * from '@/plugins'
export * from '@/types'
export * from '@/utilities'

import { App, Plugin } from 'vue'
import { installs } from '@/components'
import { layouts } from '@/layouts'
import { plugins } from '@/plugins'

const plugin: Plugin = {
  install(app: App) {
    installs.forEach(install => install(app))
    layouts.forEach(install => install(app))
    plugins.forEach(install => install(app))
  },
}

export { plugin }