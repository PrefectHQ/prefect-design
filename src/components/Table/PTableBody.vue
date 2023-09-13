<template>
  <tbody class="p-table-body p-background">
    <slot>
      <template v-for="(row, index) in data" :key="index">
        <PTableRow>
          <slot name="row" v-bind="{ row, index }">
            <template v-for="column in columns" :key="column">
              <slot :name="kebabCase(column.label)" :value="getValue(row, column)" v-bind="{ column, row }">
                <PTableData>
                  {{ getValue(row, column) }}
                </PTableData>
              </slot>
            </template>
          </slot>
        </PTableRow>
      </template>
    </slot>
  </tbody>
</template>

<script lang="ts" generic="T extends TableData" setup>
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableRow from '@/components/Table/PTableRow.vue'
  import { TableColumn, TableData } from '@/types/tables'
  import { kebabCase } from '@/utilities/strings'

  withDefaults(defineProps<{
    data?: T[],
    columns?: TableColumn<T>[],
  }>(), {
    data: () => [],
    columns: () => [],
  })

  function getValue(row: T, column: TableColumn<T>): unknown {
    if (column.property) {
      return row[column.property]
    }

    return ''
  }
</script>

<style>
.p-table-body { @apply
  divide-y
  divide-divider
}
</style>