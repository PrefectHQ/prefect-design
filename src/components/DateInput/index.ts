import { App } from 'vue'
import PDateInput from '@/components/DateInput/PDateInput.vue'

const install = (app: App): void => {
  app.component('PDateInput', PDateInput)
}

export { PDateInput, install }