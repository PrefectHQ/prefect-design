// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<string, any>

export type TableColumn<T = TableData> = {
  label: string,
  property?: keyof T,
} & { width?: string }