import { App } from 'vue'
import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'

const install = (app: App): void => {
  app.component('PMarkdownRenderer', PMarkdownRenderer)
}

export { PMarkdownRenderer, install }