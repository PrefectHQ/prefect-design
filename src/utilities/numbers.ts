export function isEven(value: number): boolean {
  return value % 2 == 0
}

export function isOdd(value: number): boolean {
  return value % 2 == 1
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}