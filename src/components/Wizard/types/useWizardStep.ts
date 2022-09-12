import { WritableComputedRef } from 'vue'
import { WizardStep, UseWizard } from '../types'
import { WizardStepValidator } from './validation'

export type UseWizardStep = {
  wizard: UseWizard,
  step?: WritableComputedRef<WizardStep>,
  defineValidate?: (validate: WizardStepValidator) => void,
}