import { App } from 'vue'
import PLabel from './PLabel.vue'

PLabel.install = (app: App) => {
  app.component('PLabel', PLabel)
}

export default PLabel