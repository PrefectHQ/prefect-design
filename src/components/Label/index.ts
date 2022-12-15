import { App } from 'vue'
import PLabel from '@/components/Label/PLabel.vue'

const install = (app: App): void => {
  app.component('PLabel', PLabel)
}

export { PLabel, install }