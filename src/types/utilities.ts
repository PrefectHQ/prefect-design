import { Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypeGuard<T> = (value: any) => value is T

export function refTypeGuard<T>(guard: TypeGuard<T>, ref: Ref<unknown>): ref is Ref<T> {
  return guard(ref.value)
}