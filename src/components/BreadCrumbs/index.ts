import { App } from 'vue'
import PBreadCrumbs from '@/components/BreadCrumbs/PBreadCrumbs.vue'

const install = (app: App): void => {
  app.component('PBreadCrumbs', PBreadCrumbs)
}

export { PBreadCrumbs, install }