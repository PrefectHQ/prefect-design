import { App } from 'vue'
import PTags from './PTags.vue'


PTags.install = (app: App) => {
  app.component('PTags', PTags)
}

export { PTags }
export default PTags