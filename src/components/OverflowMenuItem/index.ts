import { App } from 'vue'
import POverflowMenuItem from './POverflowMenuItem.vue'

const install = (app: App): void => {
  app.component('POverflowMenuItem', POverflowMenuItem)
}

export { POverflowMenuItem, install }