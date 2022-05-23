export type TableColumn<T = Record<string, unknown>> = {
  label: string,
  property?: keyof T,
} & { width?: string }