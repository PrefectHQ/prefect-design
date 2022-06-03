import { App } from 'vue'
import PCheckbox from './PCheckbox.vue'

const install = (app: App): void => {
  app.component('PCheckbox', PCheckbox)
}

export { PCheckbox, install }