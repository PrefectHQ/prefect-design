import { App } from 'vue'
import PWindow from './PWindow.vue'

const install = (app: App): void => {
  app.component('PWindow', PWindow)
}

export { PWindow, install }