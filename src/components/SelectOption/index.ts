import { App } from 'vue'
import PSelectOption from './PSelectOption.vue'

PSelectOption.install = (app: App) => {
  app.component('PSelectOption', PSelectOption)
}

export default PSelectOption