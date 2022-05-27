/* eslint-disable line-comment-position */

export type State = {
  touched: boolean, // if the field has been blurred (via handleBlur)
  pending: boolean, // if validation is in progress
  dirty: boolean, // if the field has been manipulated (via handleChange)
  valid: boolean, // if the field doesn't have any errors
  validated: boolean, // if the field has been validated
  initialValue?: unknown, // the field's initial value
}