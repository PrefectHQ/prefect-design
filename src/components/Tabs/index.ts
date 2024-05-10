import { App } from 'vue'
import PTabNavigation from '@/components/Tabs/PTabNavigation.vue'
import PTabs from '@/components/Tabs/PTabs.vue'
import PTabsContent from '@/components/Tabs/PTabsContent.vue'
import PTabSelect from '@/components/Tabs/PTabSelect.vue'
import PTabsList from '@/components/Tabs/PTabsList.vue'
import PTabsRoot from '@/components/Tabs/PTabsRoot.vue'
import PTabsTrigger from '@/components/Tabs/PTabsTrigger.vue'

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

  app.component('PTabsRoot', PTabsRoot)
  app.component('PTabsContent', PTabsContent)
  app.component('PTabsList', PTabsList)
  app.component('PTabsTrigger', PTabsTrigger)
}

export { PTabs, PTabNavigation, PTabSelect, PTabsRoot, PTabsContent, PTabsList, PTabsTrigger, install }