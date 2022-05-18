import { App } from 'vue'
import PNativeDateInput from './PNativeDateInput.vue'

PNativeDateInput.install = (app: App) => {
  app.component('PNativeDateInput', PNativeDateInput)
}

export default PNativeDateInput