import { App } from 'vue'
import PCheckboxGroup from '@/components/CheckboxGroup/PCheckboxGroup.vue'

const install = (app: App): void => {
  app.component('PCheckboxGroup', PCheckboxGroup)
}

export { PCheckboxGroup, install }