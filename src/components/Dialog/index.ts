import { App } from 'vue'
import PDialog from '@/components/Dialog/PDialog.vue'

const install = (app: App): void => {
  app.component('PDialog', PDialog)
}

export { PDialog, install }