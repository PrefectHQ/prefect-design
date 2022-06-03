import { App } from 'vue'
import PBreadCrumbs from './PBreadCrumbs.vue'

const install = (app: App): void => {
  app.component('PBreadCrumbs', PBreadCrumbs)
}

export { PBreadCrumbs, install }