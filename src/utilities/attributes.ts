import { ClassValue, StyleValue } from '@/types/attributes'

const listenerRegexp = /^on[^a-z]/
export function isListener(key: string): boolean {
  return listenerRegexp.test(key)
}

export function convertToClassValueObject(value: ClassValue): Record<string, boolean> {
  if (!value) {
    return {}
  }

  if (Array.isArray(value)) {
    return value.reduce((reduced, key) => ({
      ...convertToClassValueObject(key),
    }), {})
  }

  if (typeof value === 'string') {
    return { [value]: true }
  }

  return value
}

export function convertToStylesArray(value: StyleValue): StyleValue[] {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}