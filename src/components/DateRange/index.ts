import { App } from 'vue'
import PDateRange from './PDateRange.vue'

const install = (app: App): void => {
  app.component('PDateRange', PDateRange)
}

export { PDateRange, install }