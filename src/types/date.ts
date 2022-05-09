export const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type DayName = typeof dayNames[number]

export const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const
export type MonthName = typeof monthNames[number]

export function getStartOfDay(date?: Date): Date {
  const value = date ? new Date(date) : new Date()

  value.setUTCHours(0, 0, 0, 0)

  return value
}