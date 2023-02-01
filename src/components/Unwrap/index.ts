import { App } from 'vue'
import PUnwrap from '@/components/Unwrap/PUnwrap.vue'

const install = (app: App): void => {
  app.component('PUnwrap', PUnwrap)
}

export { PUnwrap, install }