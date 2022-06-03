import { App } from 'vue'
import PTabs from './PTabs.vue'

const install = (app: App): void => {
  app.component('PTabs', PTabs)
}

export { PTabs, install }