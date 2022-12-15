import { App } from 'vue'
import PWizard from '@/components/Wizard/PWizard.vue'
import PWizardHeaders from '@/components/Wizard/PWizardHeaders.vue'
import PWizardStep from '@/components/Wizard/PWizardStep.vue'
import PWizardStepHeader from '@/components/Wizard/PWizardStepHeader.vue'

const install = (app: App): void => {
  app.component('PWizard', PWizard)
  app.component('PWizardHeaders', PWizardHeaders)
  app.component('PWizardStep', PWizardStep)
  app.component('PWizardStepHeader', PWizardStepHeader)
}

export { PWizard, install }