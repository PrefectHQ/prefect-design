import { App } from 'vue'
import PCode from './PCode.vue'

const install = (app: App): void => {
  app.component('PCode', PCode)
}

export { PCode, install }