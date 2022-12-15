import { App } from 'vue'
import PTab from '@/components/Tab/PTab.vue'


const install = (app: App): void => {
  app.component('PTab', PTab)
}

export { PTab, install }