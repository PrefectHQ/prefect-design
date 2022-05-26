/* eslint-disable no-redeclare */
import { computed } from '@vue/reactivity'
import { addMinutes } from 'date-fns'
import { Ref, ref, isRef, ComputedRef } from 'vue'

export const utcOffsetMinutes = ref<number | null>(null)

export const utcOffsetMinutesDifferenceFromBrowser = computed(() => utcOffsetMinutes.value ? new Date().getTimezoneOffset() - utcOffsetMinutes.value : 0)

export function useAdjustedDate(value: Date): Date
export function useAdjustedDate(value: Date | null): Date | null
export function useAdjustedDate(value: ComputedRef<Date>): ComputedRef<Date>
export function useAdjustedDate(value: ComputedRef<Date | null>): ComputedRef<Date | null>
export function useAdjustedDate(value: Date | null | ComputedRef<Date> | ComputedRef<Date | null>): Date | null | ComputedRef<Date> | ComputedRef<Date | null> {
  if (isRef(value)) {
    return computed(() => removeAdjustmentFromDate(value.value))
  }
  console.log('test', utcOffsetMinutes.value)

  return removeAdjustmentFromDate(value)
}

export function useUnadjustedDate(value: Date): Date
export function useUnadjustedDate(value: Date | null): Date | null
export function useUnadjustedDate(value: Ref<Date>): Ref<Date>
export function useUnadjustedDate(value: Ref<Date | null>): Ref<Date | null>
export function useUnadjustedDate(value: Date | null | Ref<Date> | Ref<Date | null>): Date | null | Ref<Date> | Ref<Date | null> {
  if (isRef(value)) {
    return computed(() => addAdjustmentToDate(value.value))
  }

  return addAdjustmentToDate(value)
}

function removeAdjustmentFromDate(value: Date | null): Date | null {
  if (!value) {
    return null
  }

  return addMinutes(value, -utcOffsetMinutesDifferenceFromBrowser.value)
}

function addAdjustmentToDate(value: Date | null): Date | null {
  if (!value) {
    return null
  }

  return addMinutes(value, utcOffsetMinutesDifferenceFromBrowser.value)
}