import { App } from 'vue'
import PIconButtonMenu from './PIconButtonMenu.vue'

const install = (app: App): void => {
  app.component('PIconButtonMenu', PIconButtonMenu)
}

export { PIconButtonMenu, install }