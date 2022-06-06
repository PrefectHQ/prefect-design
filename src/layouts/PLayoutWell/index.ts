import { App } from 'vue'
import PLayoutWell from './PLayoutWell.vue'

const install = (app: App): void => {
  app.component('PLayoutWell', PLayoutWell)
}

export { PLayoutWell, install }