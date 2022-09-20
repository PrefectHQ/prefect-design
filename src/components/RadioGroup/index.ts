import { App } from 'vue'
import PRadioGroup from './PRadioGroup.vue'

const install = (app: App): void => {
  app.component('PRadioGroup', PRadioGroup)
}

export { PRadioGroup, install }