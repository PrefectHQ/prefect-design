import { App } from 'vue'
import PNativeDateInput from './PNativeDateInput.vue'

const install = (app: App): void => {
  app.component('PNativeDateInput', PNativeDateInput)
}

export { PNativeDateInput, install }