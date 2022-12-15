import { App } from 'vue'
import PTagsInput from '@/components/TagsInput/PTagsInput.vue'

const install = (app: App): void => {
  app.component('PTagsInput', PTagsInput)
}

export { PTagsInput, install }