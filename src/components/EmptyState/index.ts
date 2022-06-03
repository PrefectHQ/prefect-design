import { App } from 'vue'
import PEmptyState from './PEmptyState.vue'

const install = (app: App): void => {
  app.component('PEmptyState', PEmptyState)
}

export { PEmptyState, install }