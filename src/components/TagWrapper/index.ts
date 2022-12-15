import { App } from 'vue'
import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'

const install = (app: App): void => {
  app.component('PTagWrapper', PTagWrapper)
}

export { PTagWrapper, install }

