import { App } from 'vue'
import PLink from './PLink.vue'

const install = (app: App): void => {
  app.component('PLink', PLink)
}

export { PLink, install }