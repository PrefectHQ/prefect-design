import { App } from 'vue'
import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'

const install = (app: App): void => {
  app.component('POverflowMenu', POverflowMenu)
}

export { POverflowMenu, install }