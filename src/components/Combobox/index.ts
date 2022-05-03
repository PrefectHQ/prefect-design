import { App } from 'vue'
import PCombobox from './PCombobox.vue'

PCombobox.install = (app: App) => {
  app.component('PCombobox', PCombobox)
}

export default PCombobox