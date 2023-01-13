import { App } from 'vue'
import PSelectOptionGroup from '@/components/SelectOptionGroup/PSelectOptionGroup.vue'

const install = (app: App): void => {
  app.component('PSelectOptionGroup', PSelectOptionGroup)
}

export { PSelectOptionGroup, install }