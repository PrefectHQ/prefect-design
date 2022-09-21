import { Ref, ComputedRef } from 'vue'

export type WizardStepValidator = () => boolean | Promise<boolean>
export type ValidationState = { index: number, valid: boolean }

export type WizardStep = {
  title: string,
  key?: string,
  validate?: WizardStepValidator,
}

export type UseWizard = {
  steps: Ref<WizardStep[]>,
  currentStepIndex: Ref<number>,
  currentStep: Ref<WizardStep | undefined>,
  loading: Ref<boolean>,
  next: () => void,
  previous: () => void,
  goto: {
    (key: string): void,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    (index: number): void,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    (step: WizardStep): void,
  },
  getStepIndex: {
    (key: string): number,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    (step: WizardStep): number,
  },
  getStep: {
    (key: string): WizardStep | undefined,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    (index: number): WizardStep | undefined,
  },
  setStep: (key: string, step: WizardStep) => void,
  isValid: (index?: number) => Promise<boolean>,
}

export type UseWizardStep = {
  wizard: UseWizard,
  step: ComputedRef<WizardStep>,
  defineValidate: (validate: WizardStepValidator) => void,
}