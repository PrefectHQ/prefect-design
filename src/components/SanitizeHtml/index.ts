import { App } from 'vue'
import PSanitizeHtml from '@/components/SanitizeHtml/PSanitizeHtml.vue'

const install = (app: App): void => {
  app.component('PSanitizeHtml', PSanitizeHtml)
}

export { PSanitizeHtml, install }