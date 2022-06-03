import { App } from 'vue'
import PSelect from './PSelect.vue'

const install = (app: App): void => {
  app.component('PSelect', PSelect)
}

export { PSelect, install }