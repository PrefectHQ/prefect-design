import { App } from 'vue'
import PTextareaInput from './PTextareaInput.vue'

PTextareaInput.install = (app: App) => {
  app.component('PTextareaInput', PTextareaInput)
}

export default PTextareaInput