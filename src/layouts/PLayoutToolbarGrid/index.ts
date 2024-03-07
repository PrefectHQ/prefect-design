import { App } from 'vue'
import PLayoutToolbarGrid from '@/layouts/PLayoutToolbarGrid/PLayoutToolbarGrid.vue'

const install = (app: App): void => {
  app.component('PLayoutToolbarGrid', PLayoutToolbarGrid)
}

export { PLayoutToolbarGrid, install }