import { App } from 'vue'
import PIconText from './PIconText.vue'

PIconText.install = (app: App) => {
  app.component('PIconText', PIconText)
}

export default PIconText