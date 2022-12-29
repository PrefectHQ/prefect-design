<template>
  <div class="p-table">
    <table class="p-table__table">
      <slot>
        <PTableHead>
          <slot name="header">
            <PTableRow>
              <template v-if="showMultiselect">
                <PTableData class="p-table__checkbox-cell">
                  <p-checkbox v-model="allSelected" />
                </PTableData>
              </template>

              <template v-for="column in visibleColumns" :key="column">
                <PTableHeader :style="getColumnStyle(column)">
                  <slot :name="`${kebabCase(column.label)}-heading`" v-bind="{ column }">
                    {{ column.label }}
                  </slot>
                </PTableHeader>
              </template>
            </PTableRow>
          </slot>
        </PTableHead>
        <PTableBody>
          <template v-for="(row, rowIndex) in data" :key="rowIndex">
            <PTableRow :class="getRowClasses(row, rowIndex)">
              <template v-if="showMultiselect">
                <PTableData class="p-table__checkbox-cell">
                  <p-checkbox v-model="internalSelectedRows" :value="row" :disabled="row.disabled" />
                </PTableData>
              </template>

              <template v-for="(column, columnIndex) in visibleColumns" :key="column">
                <PTableData :class="getColumnClasses(column, getValue(row, column), columnIndex, row, rowIndex)">
                  <slot :name="kebabCase(column.label)" :value="getValue(row, column)" v-bind="{ column, row }">
                    {{ getValue(row, column) }}
                  </slot>
                </PTableData>
              </template>
            </PTableRow>
          </template>
          <template v-if="slots['empty-state'] && data.length === 0">
            <PTableRow>
              <td :colspan="visibleColumns.length">
                <slot name="empty-state" />
              </td>
            </PTableRow>
          </template>
        </PTableBody>
        <template v-if="slots.footer">
          <PTableFoot>
            <slot name="footer" />
          </PTableFoot>
        </template>
      </slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, StyleValue, useSlots } from 'vue'
  import PTableBody from '@/components/Table/PTableBody.vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableFoot from '@/components/Table/PTableFoot.vue'
  import PTableHead from '@/components/Table/PTableHead.vue'
  import PTableHeader from '@/components/Table/PTableHeader.vue'
  import PTableRow from '@/components/Table/PTableRow.vue'
  import { ClassValue } from '@/types/attributes'
  import { ColumnClassesMethod, RowClassesMethod, TableColumn, TableData } from '@/types/tables'
  import { isEven, isOdd } from '@/utilities'
  import { asArray, isStrings } from '@/utilities/arrays'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    data: TableData[],
    selected?: TableData[],
    columns?: TableColumn[],
    rowClasses?: RowClassesMethod,
    columnClasses?: ColumnClassesMethod,
  }>()

  const slots = useSlots()

  const emit = defineEmits<{
    (event: 'update:selected', value: TableData[]): void,
  }>()

  const internalSelectedRows = computed({
    get() {
      return props.selected ?? []
    },
    set(value: TableData[]) {
      emit('update:selected', value)
    },
  })

  const allSelected = computed({
    get() {
      return internalSelectedRows.value.length === selectableRows.value.length
    },
    set(value: boolean) {
      internalSelectedRows.value = value ? selectableRows.value : []
    },
  })

  const selectableRows = computed(() => props.data.filter(row => !row.disabled))

  const showMultiselect = computed(() => props.selected !== undefined && selectableRows.value.length > 0)

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
  function getColumnClasses(column: TableColumn, value: unknown, index: number, row: TableData, rowIndex: number): ClassValue {
    const custom = asArray(props.columnClasses?.(column, value, index, row, rowIndex))

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

.p-table__checkbox-cell { @apply
  flex
  justify-center
  items-center
  px-1
}
</style>