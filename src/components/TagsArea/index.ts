import { App } from 'vue'
import PTagsArea from './PTagsArea.vue'

PTagsArea.install = (app: App) => {
  app.component('PTagsArea', PTagsArea)
}

export default PTagsArea