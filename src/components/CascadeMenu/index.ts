import { App } from 'vue'
import PCascadeMenu from '@/components/CascadeMenu/PCascadeMenu.vue'
import PCascadePanel from '@/components/CascadeMenu/PCascadePanel.vue'
import PCascadeMenuItem from '@/components/CascadeMenu/PCascadeMenuItem.vue'

const install = (app: App): void => {
  app.component('PCascadeMenu', PCascadeMenu)
  app.component('PCascadeMenuItem', PCascadeMenuItem)
  app.component('PCascadePanel', PCascadePanel)
}

export { PCascadeMenu, PCascadeMenuItem, PCascadePanel, install }