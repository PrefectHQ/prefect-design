import { App } from 'vue'
import PPopOver from './PPopOver.vue'

const install = (app: App): void => {
  app.component('PPopOver', PPopOver)
}

export { PPopOver, install }