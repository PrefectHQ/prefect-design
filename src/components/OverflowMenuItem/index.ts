import { App } from 'vue'
import POverflowMenuItem from '@/components/OverflowMenuItem/POverflowMenuItem.vue'

const install = (app: App): void => {
  app.component('POverflowMenuItem', POverflowMenuItem)
}

export { POverflowMenuItem, install }