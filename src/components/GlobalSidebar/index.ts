import { App } from 'vue'
import PGlobalSidebar from '@/components/GlobalSidebar/PGlobalSidebar.vue'

const install = (app: App): void => {
  app.component('PGlobalSidebar', PGlobalSidebar)
}

export { PGlobalSidebar, install }