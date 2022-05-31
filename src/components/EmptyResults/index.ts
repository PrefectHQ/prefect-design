import { App } from 'vue'
import PEmptyResults from './PEmptyResults.vue'

PEmptyResults.install = (app: App) => {
  app.component('PEmptyResults', PEmptyResults)
}

export default PEmptyResults