import { App } from 'vue'
import PHeading from '@/components/Heading/PHeading.vue'

const install = (app: App): void => {
  app.component('PHeading', PHeading)
}

export { PHeading, install }