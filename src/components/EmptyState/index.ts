import { App } from 'vue'
import PEmptyState from './PEmptyState.vue'

PEmptyState.install = (app: App) => {
  app.component('PEmptyState', PEmptyState)
}

export default PEmptyState