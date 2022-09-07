import { App } from 'vue'
import PFrame from './PFrame.vue'

const install = (app: App): void => {
  app.component('PFrame', PFrame)
}

export { PFrame, install }