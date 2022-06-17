import { App } from 'vue'
import PCardButton from './PCardButton.vue'

const install = (app: App): void => {
  app.component('PCardButton', PCardButton)
}

export { PCardButton, install }