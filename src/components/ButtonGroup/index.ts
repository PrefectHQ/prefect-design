import { App } from 'vue'
import PButtonGroup from './PButtonGroup.vue'

const install = (app: App): void => {
  app.component('PButtonGroup', PButtonGroup)
}

export { PButtonGroup, install }