export type DateRangeSelectSpanValue = { type: 'span', seconds: number }
export type DateRangeSelectRangeValue = { type: 'range', startDate: Date, endDate: Date }

export type DateRangeSelectAroundUnit = 'second' | 'minute' | 'hour' | 'day'
export type DateRangeSelectAroundValue = { type: 'around', date: Date, quantity: number, unit: DateRangeSelectAroundUnit }

export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | DateRangeSelectAroundValue | null | undefined