import { App } from 'vue'
import PTagsArea from '@/components/TagsArea/PTagsArea.vue'

const install = (app: App): void => {
  app.component('PTagsArea', PTagsArea)
}

export { PTagsArea, install }