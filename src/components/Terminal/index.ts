import { App } from 'vue'
import PTerminal from './PTerminal.vue'

const install = (app: App): void => {
  app.component('PTerminal', PTerminal)
}

export { PTerminal, install }