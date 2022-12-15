import { App } from 'vue'
import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'

const install = (app: App): void => {
  app.component('PVirtualScroller', PVirtualScroller)
}

export { PVirtualScroller, install }