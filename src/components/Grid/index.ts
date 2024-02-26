import { App } from 'vue'
import PGrid from '@/components/Grid/PGrid.vue'
import PGridItem from '@/components/Grid/PGridItem.vue'

const install = (app: App): void => {
  app.component('PGrid', PGrid)
  app.component('PGridItem', PGridItem)
}

export { PGrid, PGridItem, install }