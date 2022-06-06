import { App } from 'vue'
import PTagsInput from './PTagsInput.vue'

const install = (app: App): void => {
  app.component('PTagsInput', PTagsInput)
}

export { PTagsInput, install }