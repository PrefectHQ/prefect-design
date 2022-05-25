import { App } from 'vue'
import PTagsInput from './PTagsInput.vue'

PTagsInput.install = (app: App) => {
  app.component('PTagsInput', PTagsInput)
}

export default PTagsInput