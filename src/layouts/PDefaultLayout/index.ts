import { App } from 'vue'
import PDefaultLayout from './PDefaultLayout.vue'

PDefaultLayout.install = (app: App) => {
  app.component('PDefaultLayout', PDefaultLayout)
}

export default PDefaultLayout