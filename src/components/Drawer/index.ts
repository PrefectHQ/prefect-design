import { App } from 'vue'
import PDrawer from '@/components/Drawer/PDrawer.vue'

const install = (app: App): void => {
  app.component('PDrawer', PDrawer)
}

export { PDrawer, install }