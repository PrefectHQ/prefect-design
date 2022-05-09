import { App } from 'vue'
import PDatePicker from './PDatePicker.vue'

PDatePicker.install = (app: App) => {
  app.component('PDatePicker', PDatePicker)
}

export default PDatePicker