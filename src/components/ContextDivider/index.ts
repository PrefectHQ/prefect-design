import { App } from 'vue'
import PContextDivider from './PContextDivider.vue'

PContextDivider.install = (app: App) => {
  app.component('PContextDivider', PContextDivider)
}

export default PContextDivider