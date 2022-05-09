/* eslint-disable no-redeclare */
import { computed } from '@vue/reactivity'
import { Ref, ref, isRef, ComputedRef } from 'vue'

export const utcOffsetMinutes = ref(360)

export function useAdjustedDate(value: Date): Date
export function useAdjustedDate(value: Date | null): Date | null
export function useAdjustedDate(value: ComputedRef<Date>): ComputedRef<Date>
export function useAdjustedDate(value: ComputedRef<Date | null>): ComputedRef<Date | null>
export function useAdjustedDate(value: Date | null | ComputedRef<Date> | ComputedRef<Date | null>): Date | null | ComputedRef<Date> | ComputedRef<Date | null> {
  if (isRef(value)) {
    console.log('ref detected')
    return computed(() => convertToBrowserDate(value.value))
  }

  return convertToBrowserDate(value)
}

function convertToBrowserDate(value: Date | null): Date | null {
  if (!value) {
    return null
  }

  const adjusted = new Date(value)

  adjusted.setMinutes(adjusted.getMinutes() - (utcOffsetMinutes.value + adjusted.getTimezoneOffset()))

  return adjusted
}

export function useBrowserDate(value: Date): Date
export function useBrowserDate(value: Date | null): Date | null
export function useBrowserDate(value: Ref<Date>): Ref<Date>
export function useBrowserDate(value: Ref<Date | null>): Ref<Date | null>
export function useBrowserDate(value: Date | null | Ref<Date> | Ref<Date | null>): Date | null | Ref<Date> | Ref<Date | null> {
  if (isRef(value)) {
    return computed(() => convertToAdjustedDate(value.value))
  }

  return convertToAdjustedDate(value)
}

function convertToAdjustedDate(value: Date | null): Date | null {
  if (!value) {
    return null
  }

  const adjusted = new Date(value)

  adjusted.setMinutes(adjusted.getMinutes() + (utcOffsetMinutes.value + adjusted.getTimezoneOffset()))

  return adjusted
}