import { App } from 'vue'
import PTagsArea from './PTagsArea.vue'

const install = (app: App): void => {
  app.component('PTagsArea', PTagsArea)
}

export { PTagsArea, install }