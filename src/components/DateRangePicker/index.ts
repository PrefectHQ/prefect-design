import { App } from 'vue'
import PDateRangePicker from '@/components/DateRangePicker/PDateRangePicker.vue'

const install = (app: App): void => {
  app.component('PDateRangePicker', PDateRangePicker)
}

export { PDateRangePicker, install }