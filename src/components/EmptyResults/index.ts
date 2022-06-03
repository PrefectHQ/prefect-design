import { App } from 'vue'
import PEmptyResults from './PEmptyResults.vue'

const install = (app: App): void => {
  app.component('PEmptyResults', PEmptyResults)
}

export { PEmptyResults, install }