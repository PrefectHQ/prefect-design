import { App } from 'vue'
import PContextNavItem from './PContextNavItem.vue'

PContextNavItem.install = (app: App) => {
  app.component('PContextNavItem', PContextNavItem)
}

export default PContextNavItem