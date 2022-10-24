const VALIDATION_ERROR_SELECTORS = [
  '.p-label--failed',
  '.p-checkbox--failed',
  '.p-radio--failed',
  '.p-base-input--failed',
]

export function scrollToValidationError(): void {
  const error = document.querySelector(VALIDATION_ERROR_SELECTORS.join(', '))

  if (error) {
    error.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }
}