import { App } from 'vue'
import PTypeAhead from './PTypeAhead.vue'

const install = (app: App): void => {
  app.component('PTypeAhead', PTypeAhead)
}

export { PTypeAhead, install }