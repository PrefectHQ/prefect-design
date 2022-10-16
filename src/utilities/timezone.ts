import { useSubscription } from '@prefecthq/vue-compositions'
import { computed } from 'vue'
import { utcOffsetMinutes } from '@/compositions/useAdjustedDate'
import { InvalidTimezoneError } from '@/models/invalidTimezoneError'
import { timezonesApi } from '@/services/timezoneApi'

const timezoneSubscription = useSubscription(timezonesApi.getTimezones, [])
const timezones = computed(() => timezoneSubscription.response ?? {})

export async function setUtcOffsetMinutes(timezone: string): Promise<void> {
  if (utcOffsetMinutes.value === null) {
    await timezoneSubscription.promise()
    const timezoneOffsetSeconds = timezones.value[timezone]

    if (timezoneOffsetSeconds === undefined) {
      throw new InvalidTimezoneError()
    }

    utcOffsetMinutes.value = timezoneOffsetSeconds / 60
  }
}