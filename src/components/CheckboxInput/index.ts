import { App } from 'vue'
import PCheckboxInput from './PCheckboxInput.vue'

PCheckboxInput.install = (app: App) => {
  app.component('PCheckboxInput', PCheckboxInput)
}

export default PCheckboxInput