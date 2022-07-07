export function isStrings(array: unknown[]): array is string[] {
  return array.every(value => typeof value === 'string')
}

export function reduceToRecord<S, T>(array: S[], key: (item: S) => string, value: (item: S) => T): Record<string, T> {
  return array.reduce<Record<string, T>>((reduced, item) => {
    reduced[key(item)] = value(item)

    return reduced
  }, {})
}

export function reduceToMap<S, T>(array: S[], key: (item: S) => string, value: (item: S) => T): Map<string, T> {
  return array.reduce<Map<string, T>>((reduced, item) => {
    reduced.set(key(item), value(item))

    return reduced
  }, new Map())
}