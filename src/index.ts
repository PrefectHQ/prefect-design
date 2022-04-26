
export * from '@/components'

import { App, Plugin } from 'vue'
import { installs } from '@/components'

const plugin: Plugin = {
  install(app: App) {
    installs.forEach(install => install(app))
  },
}

export { plugin }