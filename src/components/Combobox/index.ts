import { App } from 'vue'
import PCombobox from './PCombobox.vue'

const install = (app: App): void => {
  app.component('PCombobox', PCombobox)
}

export { PCombobox, install }