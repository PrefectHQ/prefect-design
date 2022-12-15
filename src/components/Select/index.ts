import { App } from 'vue'
import PSelect from '@/components/Select/PSelect.vue'

const install = (app: App): void => {
  app.component('PSelect', PSelect)
}

export { PSelect, install }