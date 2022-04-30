import { App } from 'vue'
import PNativeSelect from './PNativeSelect.vue'

PNativeSelect.install = (app: App) => {
  app.component('PNativeSelect', PNativeSelect)
}

export default PNativeSelect