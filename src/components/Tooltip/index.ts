import { App } from 'vue'
import PTooltip from '@/components/Tooltip/PTooltip.vue'
import PTooltipContent from '@/components/Tooltip/PTooltipContent.vue'
import PTooltipProvider from '@/components/Tooltip/PTooltipProvider.vue'
import PTooltipRoot from '@/components/Tooltip/PTooltipRoot.vue'
import PTooltipTrigger from '@/components/Tooltip/PTooltipTrigger.vue'

const install = (app: App): void => {
  app.component('PTooltip', PTooltip)
  app.component('PTooltipRoot', PTooltipRoot)
  app.component('PTooltipProvider', PTooltipProvider)
  app.component('PTooltipTrigger', PTooltipTrigger)
  app.component('PTooltipContent', PTooltipContent)
}

export { PTooltip, PTooltipRoot, PTooltipProvider, PTooltipTrigger, PTooltipContent, install }