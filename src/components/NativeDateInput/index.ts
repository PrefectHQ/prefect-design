import { App } from 'vue'
import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'

const install = (app: App): void => {
  app.component('PNativeDateInput', PNativeDateInput)
}

export { PNativeDateInput, install }