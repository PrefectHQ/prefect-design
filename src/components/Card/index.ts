import { App } from 'vue'
import PCard from '@/components/Card/PCard.vue'

const install = (app: App): void => {
  app.component('PCard', PCard)
}

export { PCard, install }