import { App } from 'vue'
import PTagWrapper from './PTagWrapper.vue'

const install = (app: App): void => {
  app.component('PTagWrapper', PTagWrapper)
}

export { PTagWrapper, install }

