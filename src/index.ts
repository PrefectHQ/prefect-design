export * from '@/components'
export * from '@/plugins'
export * from '@/types'

import '@/styles/index.css'

import { App, Plugin } from 'vue'
import { installs } from '@/components'
import { plugins } from '@/plugins'

const plugin: Plugin = {
  install(app: App) {
    installs.forEach(install => install(app))
    plugins.forEach(install => install(app))
  },
}

export { plugin }