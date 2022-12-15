import { App } from 'vue'
import PButtonGroup from '@/components/ButtonGroup/PButtonGroup.vue'

const install = (app: App): void => {
  app.component('PButtonGroup', PButtonGroup)
}

export { PButtonGroup, install }