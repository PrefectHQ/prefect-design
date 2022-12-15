import { App } from 'vue'
import PMessage from '@/components/Message/PMessage.vue'

const install = (app: App): void => {
  app.component('PMessage', PMessage)
}

export { PMessage, install }