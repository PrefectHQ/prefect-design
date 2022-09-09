import { WizardStepValidator } from './validation'

export type Step = {
  title: string,
  key?: string,
  validate?: WizardStepValidator,
}