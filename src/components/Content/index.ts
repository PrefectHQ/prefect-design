import { App } from 'vue'
import PContent from '@/components/Content/PContent.vue'

const install = (app: App): void => {
  app.component('PContent', PContent)
}

export { PContent, install }