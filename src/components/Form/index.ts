import { App } from 'vue'
import PForm from './PForm.vue'

const install = (app: App): void => {
  app.component('PForm', PForm)
}

export { PForm, install }