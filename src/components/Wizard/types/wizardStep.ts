import { WizardStepValidator } from './validation'

export type WizardStep = {
  title: string,
  key?: string,
  validate?: WizardStepValidator,
}