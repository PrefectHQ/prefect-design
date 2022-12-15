import { App } from 'vue'
import PTag from '@/components/Tag/PTag.vue'

const install = (app: App): void => {
  app.component('PTag', PTag)
}

export { PTag, install }