import { App } from 'vue'
import PContextDivider from '@/components/ContextDivider/PContextDivider.vue'

const install = (app: App): void => {
  app.component('PContextDivider', PContextDivider)
}

export { PContextDivider, install }