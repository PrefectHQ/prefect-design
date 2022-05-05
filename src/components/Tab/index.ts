import { App } from 'vue'
import PTab from './PTab.vue'


PTab.install = (app: App) => {
  app.component('PTab', PTab)
}

export { PTab }
export default PTab