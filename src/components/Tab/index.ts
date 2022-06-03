import { App } from 'vue'
import PTab from './PTab.vue'


const install = (app: App): void => {
  app.component('PTab', PTab)
}

export { PTab, install }