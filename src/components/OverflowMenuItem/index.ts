import { App } from 'vue'
import POverflowMenuItem from './POverflowMenuItem.vue'

POverflowMenuItem.install = (app: App) => {
  app.component('POverflowMenuItem', POverflowMenuItem)
}

export default POverflowMenuItem