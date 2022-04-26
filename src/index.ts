
export * from '@/components'

import { App, Plugin } from 'vue'
import { components } from '@/components'

const plugin: Plugin = {
  install(app: App) {
    for (const key in components) {
      const component = components[key]
      component.install(app)
    }
  },
}

export { plugin }