import { App } from 'vue'
import PSelect from './PSelect.vue'

PSelect.install = (app: App) => {
  app.component('PSelect', PSelect)
}

export default PSelect