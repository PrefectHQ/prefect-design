import { App } from 'vue'
import PWizard from './PWizard.vue'
import PWizardHeaders from './PWizardHeaders.vue'
import PWizardStep from './PWizardStep.vue'
import PWizardStepHeader from './PWizardStepHeader.vue'

const install = (app: App): void => {
  app.component('PWizard', PWizard)
  app.component('PWizardHeaders', PWizardHeaders)
  app.component('PWizardStep', PWizardStep)
  app.component('PWizardStepHeader', PWizardStepHeader)
}

export { PWizard, install }