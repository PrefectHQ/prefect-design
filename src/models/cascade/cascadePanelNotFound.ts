export class CascadePanelNotFound extends Error {
  public constructor() {
    super('Cascade panel not found. Are you sure the component calling useCascadePanel() exists within a <p-cascade-panel> component context?')
  }
}