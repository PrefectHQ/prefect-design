import { ClassValue } from '@/types/attributes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<string, any>

export type TableColumn<T extends TableData = Record<never, never>> = {
  label: string,
  property?: T extends T ? keyof T : never,
  width?: string,
  visible?: boolean,
  disabled?: boolean,
}

export type RowClassesMethod<T extends TableData> = (row: T, index: number) => ClassValue
export type ColumnClassesMethod<T extends TableData = Record<never, never>> = (column: TableColumn<T>, value: unknown, index: number, row: TableData, rowIndex: number) => ClassValue
