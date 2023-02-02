import { App } from 'vue'
import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'

const install = (app: App): void => {
  app.component('PCodeHighlight', PCodeHighlight)
}

export { PCodeHighlight, install }