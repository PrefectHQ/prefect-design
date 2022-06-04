import { App } from 'vue'
import PCard from './PCard.vue'

const install = (app: App): void => {
  app.component('PCard', PCard)
}

export { PCard, install }