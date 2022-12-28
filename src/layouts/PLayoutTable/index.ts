import { App } from 'vue'
import PLayoutTable from '@/layouts/PLayoutTable/PLayoutTable.vue'

const install = (app: App): void => {
  app.component('PLayoutTable', PLayoutTable)
}

export { PLayoutTable, install }