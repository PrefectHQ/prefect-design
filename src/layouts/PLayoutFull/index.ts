import { App } from 'vue'
import PLayoutFull from './PLayoutFull.vue'

PLayoutFull.install = (app: App) => {
  app.component('PLayoutFull', PLayoutFull)
}

export default PLayoutFull