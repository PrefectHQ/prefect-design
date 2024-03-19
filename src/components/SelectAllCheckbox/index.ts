import { App } from 'vue'
import PSelectAllCheckbox from '@/components/SelectAllCheckbox/PSelectAllCheckbox.vue'

const install = (app: App): void => {
  app.component('PSelectAllCheckbox', PSelectAllCheckbox)
}

export { PSelectAllCheckbox, install }