import { StyleValue } from '@/types/attributes'

const listenerRegexp = /^on[^a-z]/
export function isListener(key: string): boolean {
  return listenerRegexp.test(key)
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