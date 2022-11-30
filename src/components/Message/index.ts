import { App } from 'vue'
import PMessage from './PMessage.vue'

const install = (app: App): void => {
  app.component('PMessage', PMessage)
}

export { PMessage, install }