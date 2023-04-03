export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}