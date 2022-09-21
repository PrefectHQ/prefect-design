import { App } from 'vue'
import PRadio from './PRadio.vue'

const install = (app: App): void => {
  app.component('PRadio', PRadio)
}

export { PRadio, install }