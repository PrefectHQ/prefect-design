import { App } from 'vue'
import PDateRangeInput from './PDateRangeInput.vue'

const install = (app: App): void => {
  app.component('PDateRangeInput', PDateRangeInput)
}

export { PDateRangeInput, install }