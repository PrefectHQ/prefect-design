import { Key } from '@/types'

export function isKeyEvent(key: Key, event: KeyboardEvent): boolean {
  return event.key === key
}