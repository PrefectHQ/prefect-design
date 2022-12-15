import { App } from 'vue'
import PLayoutWell from '@/layouts/PLayoutWell/PLayoutWell.vue'

const install = (app: App): void => {
  app.component('PLayoutWell', PLayoutWell)
}

export { PLayoutWell, install }