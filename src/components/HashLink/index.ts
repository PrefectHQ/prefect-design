import { App } from 'vue'
import PHashLink from '@/components/HashLink/PHashLink.vue'

const install = (app: App): void => {
  app.component('PHashLink', PHashLink)
}

export { PHashLink, install }