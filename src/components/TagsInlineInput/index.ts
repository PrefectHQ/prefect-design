import { App } from 'vue'
import PTagsInlineInput from './PTagsInlineInput.vue'

PTagsInlineInput.install = (app: App) => {
  app.component('PTagsInlineInput', PTagsInlineInput)
}

export default PTagsInlineInput