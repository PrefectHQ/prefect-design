import { App } from 'vue'
import PTabNavigation from '@/components/Tabs/PTabNavigation.vue'
import PTabs from '@/components/Tabs/PTabs.vue'
import PTabSelect from '@/components/Tabs/PTabSelect.vue'

const install = (app: App): void => {
  app.component('PTabs', PTabs)
  app.component('PTabNavigation', PTabNavigation)
  app.component('PTabSelect', PTabSelect)
}

export { PTabs, PTabNavigation, PTabSelect, install }