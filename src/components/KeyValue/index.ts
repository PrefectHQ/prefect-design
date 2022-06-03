import { App } from 'vue'
import PKeyValue from './PKeyValue.vue'

const install = (app: App): void => {
  app.component('PKeyValue', PKeyValue)
}

export { PKeyValue, install }