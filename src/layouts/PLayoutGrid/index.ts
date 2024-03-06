import { App } from 'vue'
import PLayoutGrid from '@/layouts/PLayoutGrid/PLayoutGrid.vue'

const install = (app: App): void => {
  app.component('PLayoutWellToolbar', PLayoutGrid)
}

export { PLayoutGrid, install }