export function isStrings(array: unknown[]): array is string[] {
  return array.every(value => typeof value === 'string')
}