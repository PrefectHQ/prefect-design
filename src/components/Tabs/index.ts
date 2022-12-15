import { App } from 'vue'
import PTabs from '@/components/Tabs/PTabs.vue'

const install = (app: App): void => {
  app.component('PTabs', PTabs)
}

export { PTabs, install }