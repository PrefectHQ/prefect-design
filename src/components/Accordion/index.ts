import { App } from 'vue'
import PAccordion from '@/components/Accordion/PAccordion.vue'

const install = (app: App): void => {
  app.component('PAccordion', PAccordion)
}

export { PAccordion, install }