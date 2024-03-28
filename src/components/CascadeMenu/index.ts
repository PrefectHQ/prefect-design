import { App } from 'vue'
import PCascadeMenu from '@/components/CascadeMenu/PCascadeMenu.vue'
import PCascadeMenuButton from '@/components/CascadeMenu/PCascadeMenuButton.vue'
import PCascadeMenuItem from '@/components/CascadeMenu/PCascadeMenuItem.vue'
import PCascadePanel from '@/components/CascadeMenu/PCascadePanel.vue'

const install = (app: App): void => {
  app.component('PCascadeMenu', PCascadeMenu)
  app.component('PCascadeMenuItem', PCascadeMenuItem)
  app.component('PCascadePanel', PCascadePanel)
  app.component('PCascadeMenuButton', PCascadeMenuButton)
}

export { PCascadeMenu, PCascadeMenuButton, PCascadeMenuItem, PCascadePanel, install }