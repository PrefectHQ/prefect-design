import { App } from 'vue'
import PTextInput from './PTextInput.vue'

PTextInput.install = (app: App) => {
  app.component('PTextInput', PTextInput)
}

export default PTextInput