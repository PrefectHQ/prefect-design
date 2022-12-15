<template>
  <tbody class="p-table-body">
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

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import PTableData from '@/components/Table/PTableData.vue'
  import PTableRow from '@/components/Table/PTableRow.vue'
  import { TableColumn, TableData } from '@/types/tables'
  import { kebabCase } from '@/utilities/strings'

  withDefaults(defineProps<{
    data?: TableData[],
    columns?: TableColumn[],
  }>(), {
    data: () => [],
    columns: () => [],
  })

  function getValue(row: TableData, column: TableColumn): unknown {
    if (column.property) {
      return row[column.property]
    }

    return ''
  }
</script>

<style>
.p-table-body { @apply
  divide-y
  divide-gray-200
  bg-white
}
</style>