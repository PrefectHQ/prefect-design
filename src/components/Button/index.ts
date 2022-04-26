import { App } from 'vue'
import PButton from './PButton.vue'


PButton.install = (app: App) => {
  app.component('PButton', PButton)
}

export { PButton }
