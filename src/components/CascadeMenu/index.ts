import { App } from 'vue'
import PCascadePanel from '@/components/CascadeMenu/PCascadePanel.vue'
import PCascadePanels from '@/components/CascadeMenu/PCascadePanels.vue'
import PCascadePanelsButton from '@/components/CascadeMenu/PCascadePanelsButton.vue'

const install = (app: App): void => {
  app.component('PCascadePanels', PCascadePanels)
  app.component('PCascadePanel', PCascadePanel)
  app.component('PCascadePanelsButton', PCascadePanelsButton)
}

export { PCascadePanels, PCascadePanelsButton, PCascadePanel, install }