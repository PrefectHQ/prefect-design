import { isDate } from 'date-fns'

export function isRecord(item: unknown): item is Record<PropertyKey, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item) && !isDate(item)
}
