import { App } from 'vue'
import PListTruncate from '@/components/ListTruncate/PListTruncate.vue'

const install = (app: App): void => {
  app.component('PListTruncate', PListTruncate)
}

export { PListTruncate, install }