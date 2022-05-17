import { App } from 'vue'
import PListItemInput from './PListItemInput.vue'

PListItemInput.install = (app: App) => {
  app.component('PListItemInput', PListItemInput)
}

export default PListItemInput