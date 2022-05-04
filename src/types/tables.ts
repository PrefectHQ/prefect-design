export type TableNativeColumn<T = Record<string, unknown>> = {
  label: string,
  property: keyof T,
} & { width?: string }