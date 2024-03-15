import { App } from 'vue'
import PContextMenu from '@/components/ContextMenu/PContextMenu.vue'

const install = (app: App): void => {
  app.component('PContextMenu', PContextMenu)
}

export { PContextMenu, install }