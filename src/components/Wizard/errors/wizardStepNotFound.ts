export class WizardStepNotFound extends Error {
  public constructor() {
    super('Wizard step not found. Are you sure that the parent <p-wizard> was given a step with the kebab case title given?')
  }
}