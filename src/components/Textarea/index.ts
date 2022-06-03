import { App } from 'vue'
import PTextarea from './PTextarea.vue'

const install = (app: App): void => {
  app.component('PTextarea', PTextarea)
}

export { PTextarea, install }