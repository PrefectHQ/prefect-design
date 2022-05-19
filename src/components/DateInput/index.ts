import { App } from 'vue'
import PDateInput from './PDateInput.vue'

PDateInput.install = (app: App) => {
  app.component('PDateInput', PDateInput)
}

export default PDateInput