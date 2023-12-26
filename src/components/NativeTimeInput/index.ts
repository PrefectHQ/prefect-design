import { App } from 'vue'
import PNativeTimeInput from '@/components/NativeTimeInput/PNativeTimeInput.vue'

const install = (app: App): void => {
  app.component('PNativeTimeInput', PNativeTimeInput)
}

export { PNativeTimeInput, install }