import { App } from 'vue'
import PCascadeMenu from '@/components/CascadeMenu/PCascadeMenu.vue'

const install = (app: App): void => {
  app.component('PCascadeMenu', PCascadeMenu)
}

export { PCascadeMenu, install }