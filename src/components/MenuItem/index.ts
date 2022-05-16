import { App } from 'vue'
import PMenuItem from './PMenuItem.vue'

PMenuItem.install = (app: App) => {
  app.component('PMenuItem', PMenuItem)
}

export default PMenuItem