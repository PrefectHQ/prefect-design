import { App } from 'vue'
import PTags from './PTags.vue'

const install = (app: App): void => {
  app.component('PTags', PTags)
}

export { PTags, install }