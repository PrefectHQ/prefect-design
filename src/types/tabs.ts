export type Tab = {
  label: string,
  disabled?: boolean,
}

export function isTab(value: unknown): value is Tab {
  return typeof value === 'object' && value !== null && 'label' in value
}

export function normalizeTab(value: string | Tab): Tab {
  if (isTab(value)) {
    return value
  }

  return {
    label: value,
  }
}