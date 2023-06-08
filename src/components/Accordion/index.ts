import { App } from 'vue'
import PAccordion from '@/components/Accordion/PAccordion.vue'

const install = (app: App): void => {
  // adding defineSlots doesn't match what app.component expects
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  app.component('PAccordion', PAccordion)
}

export { PAccordion, install }