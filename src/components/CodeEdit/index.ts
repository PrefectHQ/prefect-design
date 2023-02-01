import { App } from 'vue'
import PCodeEdit from '@/components/CodeEdit/PCodeEdit.vue'

const install = (app: App): void => {
  app.component('PCodeEdit', PCodeEdit)
}

export { PCodeEdit, install }