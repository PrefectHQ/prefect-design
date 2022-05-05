import { App } from 'vue'
import PCode from './PCode.vue'

PCode.install = (app: App) => {
  app.component('PCode', PCode)
}

export default PCode

export {
  PCode
}