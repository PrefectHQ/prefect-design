import { App } from 'vue'
import PToggle from './PToggle.vue'

PToggle.install = (app: App) => {
  app.component('PToggle', PToggle)
}

export default PToggle