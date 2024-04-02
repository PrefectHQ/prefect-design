import { App } from 'vue'
import PCascadePanel from '@/components/CascadeMenu/PCascadePanel.vue'
import PCascadePanels from '@/components/CascadeMenu/PCascadePanels.vue'

const install = (app: App): void => {
  app.component('PCascadePanels', PCascadePanels)
  app.component('PCascadePanel', PCascadePanel)
}

export { PCascadePanels, PCascadePanel, install }