import { App } from 'vue'
import PFullLayout from './PFullLayout.vue'

PFullLayout.install = (app: App) => {
  app.component('PFullLayout', PFullLayout)
}

export default PFullLayout