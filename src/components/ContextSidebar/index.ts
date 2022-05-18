import { App } from 'vue'
import PContextSidebar from './PContextSidebar.vue'

PContextSidebar.install = (app: App) => {
  app.component('PContextSidebar', PContextSidebar)
}

export default PContextSidebar