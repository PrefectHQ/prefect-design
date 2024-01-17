export function isStrings(array: unknown[]): array is string[] {
  return array.every(value => typeof value === 'string')
}

export function reduceToRecord<S, K extends string | number | symbol, V>(array: S[], key: (item: S) => K, value: (item: S) => V): Record<K, V> {
  return array.reduce((reduced, item) => {
    reduced[key(item)] = value(item)

    return reduced
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as Record<K, V>)
}

export function reduceToMap<S, K, V>(array: S[], key: (item: S) => K, value: (item: S) => V): Map<K, V> {
  return array.reduce<Map<K, V>>((reduced, item) => {
    reduced.set(key(item), value(item))

    return reduced
  }, new Map())
}

export function asArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value]
}

export function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value)
}

export function sortStringArray(array: string[]): string[] {
  return array.sort((stringA: string, stringB: string) => stringA.localeCompare(stringB))
}

export function toggleArrayValue<T>(array: T[], value: T): T[] {
  const index = array.indexOf(value)

  if (index > -1) {
    array = [...array.slice(0, index), ...array.slice(index + 1)]
  } else {
    array = [...array, value]
  }

  return array
}