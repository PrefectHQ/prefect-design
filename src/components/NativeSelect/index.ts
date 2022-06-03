import { App } from 'vue'
import PNativeSelect from './PNativeSelect.vue'

const install = (app: App): void => {
  app.component('PNativeSelect', PNativeSelect)
}

export { PNativeSelect, install }