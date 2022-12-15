import { App } from 'vue'
import PLink from '@/components/Link/PLink.vue'

const install = (app: App): void => {
  app.component('PLink', PLink)
}

export { PLink, install }