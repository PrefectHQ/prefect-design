import { App } from 'vue'
import PNumberInput from './PNumberInput.vue'

PNumberInput.install = (app: App) => {
  app.component('PNumberInput', PNumberInput)
}

export default PNumberInput