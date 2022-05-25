import { App } from 'vue'
import PLink from './PLink.vue'

PLink.install = (app: App) => {
  app.component('PLink', PLink)
}

export default PLink