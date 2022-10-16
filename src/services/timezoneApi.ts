import { Timezone, TimezonesResponse } from '@/models/timezone'
import { reduceToRecord } from '@/utilities/arrays'

export class TimezonesApi {
  public getTimezones(): Promise<Timezone> {
    return fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=E2GZ0V4ZNSEC&format=json')
      .then((response) => response.json())
      .then((data: TimezonesResponse) => {
        if (data.status !== 'OK') {
          console.error(data.message)
          return {}
        }

        return reduceToRecord(data.zones, timezone => timezone.zoneName, timezone => timezone.gmtOffset)
      })
  }
}

export const timezonesApi = new TimezonesApi()