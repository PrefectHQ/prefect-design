export type Tab = {
  label: string,
  disabled?: boolean,
}

export function isTab(value: unknown): value is Tab {
  return typeof value === 'object' && value !== null && 'label' in value
}

export function areTabs(values: unknown[]): values is Tab[] {
  return values.every(isTab)
}