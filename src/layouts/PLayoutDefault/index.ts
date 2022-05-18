import { App } from 'vue'
import PLayoutDefault from './PLayoutDefault.vue'

PLayoutDefault.install = (app: App) => {
  app.component('PLayoutDefault', PLayoutDefault)
}

export default PLayoutDefault