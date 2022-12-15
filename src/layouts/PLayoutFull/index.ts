import { App } from 'vue'
import PLayoutFull from '@/layouts/PLayoutFull/PLayoutFull.vue'

const install = (app: App): void => {
  app.component('PLayoutFull', PLayoutFull)
}

export { PLayoutFull, install }