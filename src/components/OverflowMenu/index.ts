import { App } from 'vue'
import POverflowMenu from './POverflowMenu.vue'

POverflowMenu.install = (app: App) => {
  app.component('POverflowMenu', POverflowMenu)
}

export default POverflowMenu