import { App } from 'vue'
import PTags from '@/components/Tags/PTags.vue'

const install = (app: App): void => {
  app.component('PTags', PTags)
}

export { PTags, install }