/* eslint-disable @typescript-eslint/unified-signatures */
import { Ref } from 'vue'
import { WizardStep } from './wizardStep'

export type UseWizard = {
  steps: Ref<WizardStep[]>,
  currentStepIndex: Ref<number>,
  currentStep: Ref<WizardStep | undefined>,
  loading: Ref<boolean>,
  next: () => void,
  previous: () => void,
  goto: {
    (key: string): void,
    (index: number): void,
    (step: WizardStep): void,
  },
  getStepIndex: {
    (key: string): number,
    (step: WizardStep): number,
  },
  getStep: {
    (key: string): WizardStep | undefined,
    (index: number): WizardStep | undefined,
  },
  setStep: (key: string, step: WizardStep) => void,
  isValid: (index?: number) => Promise<boolean>,
}