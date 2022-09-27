import { App } from 'vue'
import PCheckboxGroup from './PCheckboxGroup.vue'

const install = (app: App): void => {
  app.component('PCheckboxGroup', PCheckboxGroup)
}

export { PCheckboxGroup, install }