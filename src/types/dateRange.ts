export type DateRangeSelectSpanValue = { type: 'span', seconds: number }
export type DateRangeSelectRangeValue = { type: 'range', startDate: Date, endDate: Date }
export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | null | undefined