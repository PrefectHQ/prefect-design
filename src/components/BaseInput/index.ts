import { App } from 'vue'
import PBaseInput from './PBaseInput.vue'

const install = (app: App): void => {
  app.component('PBaseInput', PBaseInput)
}

export { PBaseInput, install }