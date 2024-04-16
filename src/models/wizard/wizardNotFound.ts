export class WizardNotFound extends Error {
  public constructor() {
    super('Wizard not found. Are you sure the component calling useWizard() exists within a <p-wizard>?')
  }
}