import { App } from 'vue'
import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
import PYearPicker from '@/components/DatePicker/PYearPicker.vue'

const install = (app: App): void => {
  app.component('PDatePicker', PDatePicker)
  app.component('PMonthPicker', PMonthPicker)
  app.component('PTimePicker', PTimePicker)
  app.component('PYearPicker', PYearPicker)
}

export { PDatePicker, PMonthPicker, PTimePicker, PYearPicker, install }