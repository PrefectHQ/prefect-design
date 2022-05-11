import { App } from 'vue'
import PContextNavLink from './PContextNavLink.vue'

PContextNavLink.install = (app: App) => {
  app.component('PContextNavLink', PContextNavLink)
}

export default PContextNavLink