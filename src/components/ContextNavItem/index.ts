import { App } from 'vue'
import PContextNavItem from '@/components/ContextNavItem/PContextNavItem.vue'

const install = (app: App): void => {
  app.component('PContextNavItem', PContextNavItem)
}

export { PContextNavItem, install }