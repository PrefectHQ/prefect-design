import { App } from 'vue'
import PToggle from './PToggle.vue'

const install = (app: App): void => {
  app.component('PToggle', PToggle)
}

export { PToggle, install }