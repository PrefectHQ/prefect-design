import { App } from 'vue'
import PDatePicker from './PDatePicker.vue'
import PMonthPicker from './PMonthPicker.vue'
import PTimePicker from './PTimePicker.vue'
import PYearPicker from './PYearPicker.vue'

const install = (app: App): void => {
  app.component('PDatePicker', PDatePicker)
  app.component('PMonthPicker', PMonthPicker)
  app.component('PTimePicker', PTimePicker)
  app.component('PYearPicker', PYearPicker)
}

export { PDatePicker, PMonthPicker, PTimePicker, PYearPicker, install }