export function isStrings(array: unknown[]): array is string[] {
  return array.every(value => typeof value === 'string')
}

export function reduceToRecord<S, K extends string | number | symbol, V>(array: S[], key: (item: S) => K, value: (item: S) => V): Record<K, V> {
  return array.reduce((reduced, item) => {
    reduced[key(item)] = value(item)

    return reduced
  }, {} as Record<K, V>)
}

export function reduceToMap<S, K, V>(array: S[], key: (item: S) => K, value: (item: S) => V): Map<K, V> {
  return array.reduce<Map<K, V>>((reduced, item) => {
    reduced.set(key(item), value(item))

    return reduced
  }, new Map())
}