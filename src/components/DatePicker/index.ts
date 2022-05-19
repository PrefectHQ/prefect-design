import { App } from 'vue'
import PDatePicker from './PDatePicker.vue'
import PMonthPicker from './PMonthPicker.vue'
import PTimePicker from './PTimePicker.vue'
import PYearPicker from './PYearPicker.vue'

PDatePicker.install = (app: App) => {
  app.component('PDatePicker', PDatePicker)
  app.component('PMonthPicker', PMonthPicker)
  app.component('PTimePicker', PTimePicker)
  app.component('PYearPicker', PYearPicker)
}

export default PDatePicker