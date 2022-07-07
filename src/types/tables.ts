import { ClassValue } from '@/types/attributes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<string, any>

export type TableColumn<T = TableData> = {
  label: string,
  property?: keyof T,
} & { width?: string, visible?: boolean }

export type RowClassMethod = (row: TableData, index: number) => ClassValue
export type ColumnClassMethod = (column: TableColumn, index: number, row: TableData, rowIndex: number) => ClassValue