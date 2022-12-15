import { App } from 'vue'
import PIconButtonMenu from '@/components/IconButtonMenu/PIconButtonMenu.vue'

const install = (app: App): void => {
  app.component('PIconButtonMenu', PIconButtonMenu)
}

export { PIconButtonMenu, install }