import { App } from 'vue'
import PGlobalNavItem from '@/components/GlobalNavItem/PGlobalNavItem.vue'

const install = (app: App): void => {
  app.component('PGlobalNavItem', PGlobalNavItem)
}

export { PGlobalNavItem, install }