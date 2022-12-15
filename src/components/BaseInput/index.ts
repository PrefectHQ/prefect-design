import { App } from 'vue'
import PBaseInput from '@/components/BaseInput/PBaseInput.vue'

const install = (app: App): void => {
  app.component('PBaseInput', PBaseInput)
}

export { PBaseInput, install }