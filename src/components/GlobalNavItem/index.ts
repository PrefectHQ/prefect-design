import { App } from 'vue'
import PGlobalNavItem from './PGlobalNavItem.vue'

PGlobalNavItem.install = (app: App) => {
  app.component('PGlobalNavItem', PGlobalNavItem)
}

export default PGlobalNavItem