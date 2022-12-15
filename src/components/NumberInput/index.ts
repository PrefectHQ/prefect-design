import { App } from 'vue'
import PNumberInput from '@/components/NumberInput/PNumberInput.vue'

const install = (app: App): void => {
  app.component('PNumberInput', PNumberInput)
}

export { PNumberInput, install }