import { App } from 'vue'
import PLayoutDefault from '@/layouts/PLayoutDefault/PLayoutDefault.vue'

const install = (app: App): void => {
  app.component('PLayoutDefault', PLayoutDefault)
}

export { PLayoutDefault, install }