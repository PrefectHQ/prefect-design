import { App } from 'vue'
import PSelectOption from '@/components/SelectOption/PSelectOption.vue'

const install = (app: App): void => {
  app.component('PSelectOption', PSelectOption)
}

export { PSelectOption, install }