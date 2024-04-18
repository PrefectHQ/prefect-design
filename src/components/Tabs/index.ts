import { App } from 'vue'
import PTabNavigation from '@/components/Tabs/PTabNavigation.vue'
import PTabs from '@/components/Tabs/PTabs.vue'
import PTabSelect from '@/components/Tabs/PTabSelect.vue'

const install = (app: App): void => {
  // adding defineSlots doesn't match what app.component expects
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  app.component('PTabs', PTabs)
  // adding defineSlots doesn't match what app.component expects
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  app.component('PTabNavigation', PTabNavigation)
  // adding defineSlots doesn't match what app.component expects
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  app.component('PTabSelect', PTabSelect)
}

export { PTabs, PTabNavigation, PTabSelect, install }