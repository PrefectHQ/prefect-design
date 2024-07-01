<template>
  <div class="p-table">
    <table class="p-table__table">
      <slot>
        <PTableHead>
          <slot name="header">
            <PTableRow>
              <template v-if="showMultiselect">
                <PTableHeader class="p-table__checkbox-cell">
                  <PSelectAllCheckbox v-model="internalSelectedRows" :selectable="selectableRows" />
                </PTableHeader>
              </template>

              <template v-for="(column, columnIndex) in visibleColumns" :key="getHeaderColumnKey(column, columnIndex)">
                <PTableHeader :style="getColumnStyle(column)" :class="getHeaderClasses(column, columnIndex)" :title="column.label">
                  <slot :name="`${kebabCase(column.label)}-heading`" v-bind="{ column }">
                    {{ column.label }}
                  </slot>
                </PTableHeader>
              </template>
            </PTableRow>
          </slot>
        </PTableHead>
        <PTableBody>
          <template v-for="(row, rowIndex) in data" :key="getRowKey(row, rowIndex)">
            <PTableRow :class="getRowClasses(row, rowIndex)" @click="emit('row:click', { row, rowIndex })">
              <template v-if="showMultiselect">
                <PTableData class="p-table__checkbox-cell">
                  <p-checkbox v-model="internalSelectedRows" :value="row" :disabled="row.disabled" />
                </PTableData>
              </template>

              <template v-for="(column, columnIndex) in visibleColumns" :key="getColumnKey(column, columnIndex)">
                <PTableData :class="getColumnClasses(column, getValue(row, column.property), columnIndex, row, rowIndex)">
                  <slot :name="kebabCase(column.label)" :value="getValue(row, column.property)" v-bind="{ column, row }">
                    {{ getValue(row, column.property) }}
                  </slot>
                </PTableData>
              </template>
            </PTableRow>

            <template v-if="$slots['row-after']">
              <slot name="row-after" v-bind="{ row, rowIndex }" />
            </template>
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

<script lang="ts" generic="const TData extends TableData, const TColumn extends TableColumn<TData>" setup>
  import { computed, StyleValue, useSlots } from 'vue'
  import PSelectAllCheckbox from '@/components/SelectAllCheckbox/PSelectAllCheckbox.vue'
  import PTableBody from '@/components/Table/PTableBody.vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableFoot from '@/components/Table/PTableFoot.vue'
  import PTableHead from '@/components/Table/PTableHead.vue'
  import PTableHeader from '@/components/Table/PTableHeader.vue'
  import PTableRow from '@/components/Table/PTableRow.vue'
  import { ClassValue } from '@/types/attributes'
  import { ColumnClassesMethod, HeaderClassesMethod, RowClassesMethod, TableColumn, TableData } from '@/types/tables'
  import { NoInfer } from '@/types/utilities'
  import { isEven, isOdd } from '@/utilities'
  import { asArray } from '@/utilities/arrays'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    data: TData[],
    selected?: TData[],
    columns?: TColumn[],
    rowClasses?: RowClassesMethod<NoInfer<TData>>,
    headerClasses?: HeaderClassesMethod<NoInfer<TData>>,
    columnClasses?: ColumnClassesMethod<NoInfer<TData>>,
    rowKey?: (row: TData, index: number) => string | number,
    columnKey?: (column: TColumn, index: number) => string | number,
    headerColumnKey?: (column: TColumn, index: number) => string | number,
  }>()

  const slots = useSlots()

  const emit = defineEmits<{
    (event: 'update:selected', value: TData[]): void,
    (event: 'row:click', value: { row: TData, rowIndex: number }): void,
  }>()

  const internalSelectedRows = computed({
    get() {
      return props.selected ?? []
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const selectableRows = computed(() => props.data.filter(row => !row.disabled))

  const showMultiselect = computed(() => props.selected !== undefined && selectableRows.value.length > 0)

  const columns = computed<TColumn[]>(() => {
    if (props.columns) {
      return props.columns
    }

    if (props.data.length) {
      const properties = Object.keys(props.data[0])

      return convertStringsToTableColumns(properties)
    }

    return []
  })

  const visibleColumns = computed<TColumn[]>(() => columns.value.filter(column => column.visible ?? true))

  function getColumnStyle(column: TColumn): StyleValue {
    return {
      width: column.width,
      minWidth: column.minWidth ?? column.width ?? 0,
      maxWidth: column.maxWidth ?? column.width,
    }
  }

  function convertStringsToTableColumns(columns: string[]): TColumn[] {
    return columns.map(property => ({ label: property, property })) as TColumn[]
  }

  // using any here for backwards compatibility and also because defineSlots
  // isn't able to produce the correct types that are expected here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getValue<P extends keyof TData>(row: TData, property: P | undefined): any {
    if (property) {
      return row[property]
    }

    return undefined
  }

  function getRowClasses(row: TData, index: number): ClassValue {
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

  function getHeaderClasses(column: TColumn, index: number): ClassValue {
    const custom = asArray(props.headerClasses?.(column, index))

    return [
      ...custom,
      {
        'p-table-column-header--first': index === 0,
        'p-table-column-header--even': isEven(index),
        'p-table-column-header--odd': isOdd(index),
        'p-table-column-header--last': index === columns.value.length - 1,
      },
    ]
  }

  // eslint-disable-next-line max-params
  function getColumnClasses(column: TableColumn<TData>, value: unknown, index: number, row: TData, rowIndex: number): ClassValue {
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

  function getRowKey(row: TData, index: number): string | number {
    if (props.rowKey) {
      return props.rowKey(row, index)
    }

    return index
  }

  function getHeaderColumnKey(column: TColumn, index: number): string | number {
    if (props.headerColumnKey) {
      return props.headerColumnKey(column, index)
    }

    return index
  }

  function getColumnKey(column: TColumn, index: number): string | number {
    if (props.columnKey) {
      return props.columnKey(column, index)
    }

    return index
  }
</script>

<style>
.p-table { @apply
  overflow-hidden
  overflow-x-auto
  rounded-default
  border
  border-divider
}

.p-table__table { @apply
  min-w-full
  divide-y
  divide-divider
}

.p-table__checkbox-cell { @apply
  w-5
}
</style>