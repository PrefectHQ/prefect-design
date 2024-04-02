export class CascadePanelsNotFound extends Error {
  public constructor() {
    super('Cascade panels not found. Are you sure the component calling useCascadePanels() exists within a <p-cascade> component context?')
  }
}