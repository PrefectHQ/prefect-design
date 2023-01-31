import { App } from 'vue'
import PCode from '@/components/Code/PCode.vue'

const install = (app: App): void => {
  app.component('PCode', PCode)
}

export { PCode, install }