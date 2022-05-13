import { App } from 'vue'
import PTabs from './PTabs.vue'


PTabs.install = (app: App) => {
  app.component('PTabs', PTabs)
}

export { PTabs }
export default PTabs