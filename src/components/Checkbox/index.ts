import { App } from 'vue'
import PCheckbox from './PCheckbox.vue'

PCheckbox.install = (app: App) => {
  app.component('PCheckbox', PCheckbox)
}

export default PCheckbox