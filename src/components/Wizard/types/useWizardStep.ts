import { UseWizard } from '../types'
import { WizardStepValidator } from './validation'

export type UseWizardStep = {
  wizard: UseWizard,
  defineValidate: (validate: WizardStepValidator) => void,
}