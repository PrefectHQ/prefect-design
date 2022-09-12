import { ComputedRef } from 'vue'
import { WizardStep, UseWizard } from '../types'
import { WizardStepValidator } from './validation'

export type UseWizardStep = {
  wizard: UseWizard,
  step: ComputedRef<WizardStep>,
  defineValidate: (validate: WizardStepValidator) => void,
}