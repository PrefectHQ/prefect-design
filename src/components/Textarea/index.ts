import { App } from 'vue'
import PTextarea from '@/components/Textarea/PTextarea.vue'

const install = (app: App): void => {
  app.component('PTextarea', PTextarea)
}

export { PTextarea, install }