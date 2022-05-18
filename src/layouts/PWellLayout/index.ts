import { App } from 'vue'
import PWellLayout from './PWellLayout.vue'

PWellLayout.install = (app: App) => {
  app.component('PWellLayout', PWellLayout)
}

export default PWellLayout