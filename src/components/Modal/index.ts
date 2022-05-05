
import { App } from 'vue'
import PModal from './PModal.vue'

PModal.install = (app: App) => {
  app.component('PModal', PModal)
}

export default PModal