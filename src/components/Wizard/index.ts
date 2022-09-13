import { App } from 'vue'
import PWizard from './PWizard.vue'
import PWizardStepHeader from './PWizardStepHeader.vue'

const install = (app: App): void => {
  app.component('PWizard', PWizard)
  app.component('PWizardStepHeader', PWizardStepHeader)
}

export * from './compositions'
export * from './errors'
export * from './types'
export * from './utilities'

export { PWizard, install }