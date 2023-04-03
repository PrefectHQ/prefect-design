import { App } from 'vue'
import PTooltip from '@/components/Tooltip/PTooltip.vue'

const install = (app: App): void => {
  app.component('PTooltip', PTooltip)
}

export { PTooltip, install }