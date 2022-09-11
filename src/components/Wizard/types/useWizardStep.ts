import { WritableComputedRef } from 'vue'
import { Step, UseWizard } from '../types'
import { WizardStepValidator } from './validation'

export type UseWizardStep = {
  wizard: UseWizard,
  step?: WritableComputedRef<Step>,
  defineValidate?: (validate: WizardStepValidator) => void,
}