import { App } from 'vue'
import PCombobox from '@/components/Combobox/PCombobox.vue'

const install = (app: App): void => {
  app.component('PCombobox', PCombobox)
}

export { PCombobox, install }