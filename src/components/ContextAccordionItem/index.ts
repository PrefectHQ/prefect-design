import { App } from 'vue'
import PContextAccordionItem from '@/components/ContextAccordionItem/PContextAccordionItem.vue'

const install = (app: App): void => {
  app.component('PContextAccordionItem', PContextAccordionItem)
}

export { PContextAccordionItem, install }