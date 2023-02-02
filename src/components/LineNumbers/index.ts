import { App } from 'vue'
import PLineNumbers from '@/components/LineNumbers/PLineNumbers.vue'

const install = (app: App): void => {
  app.component('PLineNumbers', PLineNumbers)
}

export { PLineNumbers, install }