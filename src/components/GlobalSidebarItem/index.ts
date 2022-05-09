import { App } from 'vue'
import PGlobalSidebarItem from '../GlobalSidebarItem/PGlobalSidebarItem.vue'

PGlobalSidebarItem.install = (app: App) => {
  app.component('PGlobalSidebarItem', PGlobalSidebarItem)
}

export default PGlobalSidebarItem