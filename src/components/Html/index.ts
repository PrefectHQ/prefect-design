import { App } from 'vue'
import PHtml from '@/components/Html/PHtml.vue'

const install = (app: App): void => {
  app.component('PHtml', PHtml)
}

export { PHtml, install }