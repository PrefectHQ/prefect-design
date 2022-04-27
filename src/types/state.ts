/* eslint-disable line-comment-position */
// https://codesandbox.io/s/j2v2sf

export type State = {
  valid: boolean, // the field is valid.
  invalid: boolean, // the field is invalid.
  changed: boolean, // the field value has been changed from it's initial value.
  touched: boolean, // the field has been blurred at least once.
  untouched: boolean, // the field has never been blurred.
  pristine: boolean, // the field value has never been modified.
  dirty: boolean, // the field value has been modified.
  pending: boolean, // validation is in progress.
  required: boolean, // the field is required.
  validated: boolean, // the field has been validated at least once.
  passed: boolean, // the field has been validated and is valid.
  failed: boolean, // the field has been validated and is invalid.
}