export class PanelsNotProvided extends Error {
  public constructor() {
    super('No panels were provided and no cascade panel context was found. Are you sure the component calling useCascadePanels() exists within a <p-cascade> component context?')
  }
}