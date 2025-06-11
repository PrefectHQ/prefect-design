export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

export function isHeadingLevel(value: unknown): value is HeadingLevel {
  return typeof value === 'number' && [1, 2, 3, 4, 5, 6].includes(value) || typeof value === 'string' && ['1', '2', '3', '4', '5', '6'].includes(value)
}
