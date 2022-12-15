import { App } from 'vue'
import PToggle from '@/components/Toggle/PToggle.vue'

const install = (app: App): void => {
  app.component('PToggle', PToggle)
}

export { PToggle, install }