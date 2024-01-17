import { App } from 'vue'
import PDatePicker from '@/components/DatePicker/PDatePicker.vue'

const install = (app: App): void => {
  app.component('PDatePicker', PDatePicker)
}

export { PDatePicker, install }