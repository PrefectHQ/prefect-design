export type Tab<T extends string> = {
  label: T,
  disabled?: boolean,
}

export function isTab(value: unknown): value is Tab<string> {
  return typeof value === 'object' && value !== null && 'label' in value
}

export function normalizeTab<T extends string>(value: T | Tab<T>): Tab<T> {
  if (isTab(value)) {
    return value
  }

  return {
    label: value,
  }
}