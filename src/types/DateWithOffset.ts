import { computed } from '@vue/reactivity'
import { ref, Ref } from 'vue'

export class DateWithOffset {
  // to be displayed (set in profile settings) not browser
  public static utcOffsetMinutes: number = 360

  private readonly browserValue: Ref<Date | null> = ref(null)

  public constructor(value?: Date | string) {
    if (value) {
      this.browserValue.value = this.setAdjustedValue(value)
    }
  }

  public readonly browserUtcOffsetMinutes = computed(() => new Date().getTimezoneOffset())
  public readonly browserOffsetToPreferredOffsetMinutes = computed(() => this.browserUtcOffsetMinutes.value - DateWithOffset.utcOffsetMinutes)
  public readonly adjustedTime = computed(() => this.convertToAdjustedValue(this.browserValue.value))

  public setBrowserValue(value: Date | string): Date {
    return this.browserValue.value = new Date(value)
  }

  public setAdjustedValue(value: Date | string): Date {
    return this.browserValue.value = this.convertToBrowserValue(new Date(value))
  }

  public getDate(): Date | null {
    return this.adjustedTime.value
  }

  // should we do date-fns-tz here?
  public format(): string | null {
    return this.adjustedTime.value ? this.adjustedTime.value.toISOString() : null
  }

  private convertToBrowserValue(value: Date): Date
  private convertToBrowserValue(value: Date | null): Date | null
  private convertToBrowserValue(value: Date | null): Date | null {
    if (!value) {
      return null
    }

    const adjusted = new Date(value)

    adjusted.setMinutes(adjusted.getMinutes() - this.browserOffsetToPreferredOffsetMinutes.value)

    return adjusted
  }

  private convertToAdjustedValue(value: Date): Date
  private convertToAdjustedValue(value: Date | null): Date | null
  private convertToAdjustedValue(value: Date | null): Date | null {
    if (!value) {
      return null
    }

    const adjusted = new Date(value)

    adjusted.setMinutes(adjusted.getMinutes() + this.browserOffsetToPreferredOffsetMinutes.value)

    return adjusted
  }
}

// this gets set by nebula somewhere
// DateWithOffset.utcOffsetMinutes = 300

// write unit tests - vue compositions

// server supplies '12-22-1991 12:00:00 UTC'
// browser is in CST -6hrs from utc
// user pref is EST -5hrs from utc

// new DateWithOffset(Date(1991, 12, 22, 12:00:000), -300(EST) )
// assume date is correct if converted to UTC
// store date.toISOString()

// set( Date(1992, 12, 22, 12:00:000 ))
// convert date from CST to EST
// convert date to ISO string (UTC)

// get()
// convert iso to date (utc => CST)
// if display string, component should use date-fns-tz?