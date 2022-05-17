import { App } from 'vue'
import PKeyValue from './PKeyValue.vue'

PKeyValue.install = (app: App) => {
  app.component('PKeyValue', PKeyValue)
}

export default PKeyValue