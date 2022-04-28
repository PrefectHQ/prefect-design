import { App } from 'vue'
import PForm from './PForm.vue'

PForm.install = (app: App) => {
  app.component('PForm', PForm)
}

export default PForm