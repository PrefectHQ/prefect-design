import { App } from 'vue'
import PGlobalSidebar from './PGlobalSidebar.vue'

PGlobalSidebar.install = (app: App) => {
  app.component('PGlobalSidebar', PGlobalSidebar)
}

export default PGlobalSidebar