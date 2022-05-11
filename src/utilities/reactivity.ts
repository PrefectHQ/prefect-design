import { Ref } from 'vue'

export function refValueIsUndefined<T>(ref: Ref<T | undefined>): ref is Ref<undefined> {
  return ref.value === undefined
}

export function refValueIsDefined<T>(ref: Ref<T | undefined>): ref is Ref<T> {
  return ref.value !== undefined
}