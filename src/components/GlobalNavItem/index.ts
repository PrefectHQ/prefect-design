import { App } from 'vue'
import PGlobalNavItem from './PGlobalNavItem.vue'

const install = (app: App): void => {
  app.component('PGlobalNavItem', PGlobalNavItem)
}

export { PGlobalNavItem, install }