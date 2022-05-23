import { App } from 'vue'
import PIconButtonMenu from './PIconButtonMenu.vue'

PIconButtonMenu.install = (app: App) => {
  app.component('PIconButtonMenu', PIconButtonMenu)
}

export default PIconButtonMenu