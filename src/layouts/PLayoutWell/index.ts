import { App } from 'vue'
import PLayoutWell from './PLayoutWell.vue'

PLayoutWell.install = (app: App) => {
  app.component('PLayoutWell', PLayoutWell)
}

export default PLayoutWell