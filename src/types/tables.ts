import { ClassValue } from '@/types/attributes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<string, any>

export type TableColumn<T = TableData> = {
  label: string,
  property?: keyof T,
} & { width?: string, visible?: boolean, disabled?: boolean }

export type RowClassesMethod = (row: TableData, index: number) => ClassValue
export type ColumnClassesMethod = (column: TableColumn, value: unknown, index: number, row: TableData, rowIndex: number) => ClassValue