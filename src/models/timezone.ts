export type Timezone = Record<string, number | undefined>

export type TimezoneResponse = {
  countryCode: string,
  countryName: string,
  gmtOffset: number,
  timestamp: Date,
  zoneName: string,
}

export type TimezonesResponse = {
  message: string,
  status: 'OK' | 'FAILED',
  zones: TimezoneResponse[],
}