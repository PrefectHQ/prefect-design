import { App } from 'vue'
import PDateRangeSelect from '@/components/DateRangeSelect/PDateRangeSelect.vue'

const install = (app: App): void => {
  app.component('PDateRangeSelect', PDateRangeSelect)
}

export { PDateRangeSelect, install }