import { TableColumn } from '@/types/tables'

export function convertStringsToTableColumns(columns: string[]): TableColumn[] {
  return columns.map(property => ({ label: property, property }))
}