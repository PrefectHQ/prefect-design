import { App } from 'vue'
import PTabNav from '@/components/Tabs/PTabNav.vue'
import PTabs from '@/components/Tabs/PTabs.vue'
import PTabSelect from '@/components/Tabs/PTabSelect.vue'

const install = (app: App): void => {
  app.component('PTabs', PTabs)
  app.component('PTabNav', PTabNav)
  app.component('PTabSelect', PTabSelect)
}

export { PTabs, PTabNav, PTabSelect, install }