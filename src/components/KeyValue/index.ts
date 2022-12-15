import { App } from 'vue'
import PKeyValue from '@/components/KeyValue/PKeyValue.vue'

const install = (app: App): void => {
  app.component('PKeyValue', PKeyValue)
}

export { PKeyValue, install }