import { App } from 'vue'
import PListHeader from '@/components/ListHeader/PListHeader.vue'

const install = (app: App): void => {
  app.component('PListHeader', PListHeader)
}

export { PListHeader, install }