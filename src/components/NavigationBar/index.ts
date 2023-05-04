import { App } from 'vue'
import PNavigationBar from '@/components/NavigationBar/PNavigationBar.vue'

const install = (app: App): void => {
  app.component('PNavigationBar', PNavigationBar)
}

export { PNavigationBar, install }