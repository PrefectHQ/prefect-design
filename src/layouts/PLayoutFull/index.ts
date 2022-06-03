import { App } from 'vue'
import PLayoutFull from './PLayoutFull.vue'

const install = (app: App): void => {
  app.component('PLayoutFull', PLayoutFull)
}

export { PLayoutFull, install }