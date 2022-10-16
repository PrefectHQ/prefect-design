export class InvalidTimezoneError extends Error {
  public constructor() {
    super('timezone supplied is not found in Intl timezone database')
  }
}