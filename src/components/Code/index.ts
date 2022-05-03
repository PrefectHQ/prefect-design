import { App } from 'vue'
import PCode from './PCode.vue'
import PCodeRow from './PCodeRow.vue'

PCode.install = (app: App) => {
  app.component('PCode', PCode)
}

PCodeRow.install = (app: App) => {
  app.component('PCodeRow', PCodeRow)
}

export default PCode

export {
  PCodeRow,
  PCode
}