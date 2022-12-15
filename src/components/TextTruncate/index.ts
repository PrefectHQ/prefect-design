import { App } from 'vue'
import PTextTruncate from '@/components/TextTruncate/PTextTruncate.vue'

const install = (app: App): void => {
  app.component('PTextTruncate', PTextTruncate)
}

export { PTextTruncate, install }