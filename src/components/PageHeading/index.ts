import { App } from 'vue'
import PPageHeading from './PPageHeading.vue'

const install = (app: App): void => {
  app.component('PPageHeading', PPageHeading)
}

export { PPageHeading, install }