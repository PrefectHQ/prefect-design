import { App } from 'vue'
import PCodeInput from '@/components/CodeInput/PCodeInput.vue'

const install = (app: App): void => {
  app.component('PCodeInput', PCodeInput)
}

export { PCodeInput, install }