import { App } from 'vue'
import PTextTruncate from './PTextTruncate.vue'

const install = (app: App): void => {
  app.component('PTextTruncate', PTextTruncate)
}

export { PTextTruncate, install }