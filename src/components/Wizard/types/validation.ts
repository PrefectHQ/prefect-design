export type WizardStepValidator = () => boolean | Promise<boolean>
export type ValidationState = { index: number, valid: boolean }