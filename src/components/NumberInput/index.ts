import { App } from 'vue'
import PNumberInput from './PNumberInput.vue'

const install = (app: App): void => {
  app.component('PNumberInput', PNumberInput)
}

export { PNumberInput, install }