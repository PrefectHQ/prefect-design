export type DateRangeSelectSpanValue = { type: 'span', seconds: number }
export type DateRangeSelectRangeValue = { type: 'range', startDate: Date, endDate: Date }
export type DateRangeSelectAroundValue = { type: 'around', date: Date, seconds: number }
export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | DateRangeSelectAroundValue | null | undefined