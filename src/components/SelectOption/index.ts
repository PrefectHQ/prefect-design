import { App } from 'vue'
import PSelectOption from './PSelectOption.vue'

const install = (app: App): void => {
  app.component('PSelectOption', PSelectOption)
}

export { PSelectOption, install }