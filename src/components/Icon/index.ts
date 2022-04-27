import { App } from 'vue'
import PIcon from './PIcon.vue'

PIcon.install = (app: App) => {
  app.component('PIcon', PIcon)
}

export default PIcon