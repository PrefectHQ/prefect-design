<template>
  <div class="p-table">
    <table class="p-table__table">
      <slot>
        <p-table-head>
          <slot name="header">
            <p-table-row>
              <template v-for="column in visibleColumns" :key="column">
                <p-table-header :style="getColumnStyle(column)">
                  <slot :name="`${kebabCase(column.label)}-heading`" v-bind="{ column }">
                    {{ column.label }}
                  </slot>
                </p-table-header>
              </template>
            </p-table-row>
          </slot>
        </p-table-head>
        <p-table-body>
          <template v-for="(row, rowIndex) in data" :key="rowIndex">
            <p-table-row :class="getRowClasses(row, rowIndex)">
              <template v-for="(column, columnIndex) in visibleColumns" :key="column">
                <p-table-data :class="getColumnClasses(column, columnIndex, row, rowIndex)">
                  <slot :name="kebabCase(column.label)" :value="getValue(row, column)" v-bind="{ column, row }">
                    {{ getValue(row, column) }}
                  </slot>
                </p-table-data>
              </template>
            </p-table-row>
          </template>
          <template v-if="slots['empty-state'] && data.length === 0">
            <p-table-row>
              <td :colspan="visibleColumns.length">
                <slot name="empty-state" />
              </td>
            </p-table-row>
          </template>
        </p-table-body>
        <template v-if="slots.footer">
          <p-table-foot>
            <slot name="footer" />
          </p-table-foot>
        </template>
      </slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, StyleValue, useSlots } from 'vue'
  import PTableBody from './PTableBody.vue'
  import PTableData from './PTableData.vue'
  import PTableFoot from './PTableFoot.vue'
  import PTableHead from './PTableHead.vue'
  import PTableHeader from './PTableHeader.vue'
  import PTableRow from './PTableRow.vue'
  import { ClassValue } from '@/types/attributes'
  import { ColumnClassesMethod, RowClassesMethod, TableColumn, TableData } from '@/types/tables'
  import { isEven, isOdd } from '@/utilities'
  import { asArray, isStrings } from '@/utilities/arrays'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    data: TableData[],
    columns?: TableColumn[],
    rowClasses?: RowClassesMethod,
    columnClasses?: ColumnClassesMethod,
  }>()

  const slots = useSlots()

  const columns = computed<TableColumn[]>(() => {
    if (props.columns) {
      if (isStrings(props.columns)) {
        return convertStringsToTableColumns(props.columns)
      }

      return props.columns
    }

    if (props.data.length) {
      const properties = Object.keys(props.data[0])

      return convertStringsToTableColumns(properties)
    }

    return []
  })

  const visibleColumns = computed<TableColumn[]>(() => columns.value.filter(column => column.visible ?? true))

  function getColumnStyle(column: TableColumn): StyleValue {
    if (column.width === undefined) {
      return ''
    }

    return {
      width: column.width,
    }
  }

  function convertStringsToTableColumns(columns: string[]): TableColumn[] {
    return columns.map(property => ({ label: property, property }))
  }

  function getValue(row: TableData, column: TableColumn): unknown {
    if (column.property) {
      return row[column.property]
    }

    return ''
  }

  function getRowClasses(row: TableData, index: number): ClassValue {
    const custom = asArray(props.rowClasses?.(row, index))

    return [
      ...custom,
      {
        'p-table-row--first': index === 0,
        'p-table-row--even': isEven(index),
        'p-table-row--odd': isOdd(index),
        'p-table-row--last': index === props.data.length - 1,
      },
    ]
  }

  // eslint-disable-next-line max-params
  function getColumnClasses(column: TableColumn, index: number, row: TableData, rowIndex: number): ClassValue {
    const custom = asArray(props.columnClasses?.(column, index, row, rowIndex))

    console.log({ custom })

    return [
      ...custom,
      {
        'p-table-column--first': index === 0,
        'p-table-column--even': isEven(index),
        'p-table-column--odd': isOdd(index),
        'p-table-column--last': index === columns.value.length - 1,
      },
    ]
  }
</script>

<style scoped>
.p-table { @apply
  overflow-hidden
  overflow-x-auto
  shadow
  ring-1
  ring-black
  ring-opacity-5
  md:rounded-lg
}
.p-table__table { @apply
  min-w-full
  divide-y
  divide-gray-300
}
</style>