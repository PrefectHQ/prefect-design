import { App } from 'vue'
import PDivider from './PDivider.vue'

PDivider.install = (app: App) => {
  app.component('PDivider', PDivider)
}

export default PDivider