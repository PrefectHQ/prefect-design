import { App } from 'vue'
import PToast from './PToast.vue'

PToast.install = (app: App) => {
  app.component('PToast', PToast)
}

export default PToast