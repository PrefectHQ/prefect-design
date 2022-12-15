import { App } from 'vue'
import PDateRangeInput from '@/components/DateRangeInput/PDateRangeInput.vue'

const install = (app: App): void => {
  app.component('PDateRangeInput', PDateRangeInput)
}

export { PDateRangeInput, install }