import { App } from 'vue'
import PContextAccordionItem from './PContextAccordionItem.vue'

const install = (app: App): void => {
  app.component('PContextAccordionItem', PContextAccordionItem)
}

export { PContextAccordionItem, install }