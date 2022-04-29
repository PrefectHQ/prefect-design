import { App } from 'vue'
import PTagWrapper from './PTagWrapper.vue'

PTagWrapper.install = (app: App) => {
  app.component('PTagWrapper', PTagWrapper)
}

export { PTagWrapper }
export default PTagWrapper

