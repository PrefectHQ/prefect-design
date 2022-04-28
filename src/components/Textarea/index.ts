import { App } from 'vue'
import PTextarea from './PTextarea.vue'

PTextarea.install = (app: App) => {
  app.component('PTextarea', PTextarea)
}

export default PTextarea