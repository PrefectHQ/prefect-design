import { App } from 'vue'
import PIconText from '@/components/IconText/PIconText.vue'

const install = (app: App): void => {
  app.component('PIconText', PIconText)
}

export { PIconText, install }