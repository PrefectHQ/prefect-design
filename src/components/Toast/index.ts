import { App } from 'vue'
import PToast from '@/components/Toast/PToast.vue'

const install = (app: App): void => {
  app.component('PToast', PToast)
}

export { PToast, install }