import { App } from 'vue'
import PPager from './PPager.vue'

const install = (app: App): void => {
  app.component('PPager', PPager)
}

export { PPager, install }