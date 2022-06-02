import { App } from 'vue'
import PPopOver from './PPopOver.vue'

PPopOver.install = (app: App) => {
  app.component('PPopOver', PPopOver)
}

export default PPopOver