import { App } from 'vue'
import PContextDivider from './PContextDivider.vue'

const install = (app: App): void => {
  app.component('PContextDivider', PContextDivider)
}

export { PContextDivider, install }