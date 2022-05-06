import { App } from 'vue'
import PBreadCrumbs from './PBreadCrumbs.vue'

PBreadCrumbs.install = (app: App) => {
  app.component('PBreadCrumbs', PBreadCrumbs)
}

export default PBreadCrumbs