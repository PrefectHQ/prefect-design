import { App } from 'vue'
import PTag from './PTag.vue'

const install = (app: App): void => {
  app.component('PTag', PTag)
}

export { PTag, install }