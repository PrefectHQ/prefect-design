import { App } from 'vue'
import PLayoutResizable from '@/layouts/PLayoutResizable/PLayoutResizable.vue'

const install = (app: App): void => {
  app.component('PLayoutResizable', PLayoutResizable)
}

export { PLayoutResizable, install }