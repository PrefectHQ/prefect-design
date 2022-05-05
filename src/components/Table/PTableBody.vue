<template>
  <tbody class="p-table-body">
    <slot>
      <template v-for="(row, index) in data" :key="index">
        <p-table-row>
          <slot name="row" v-bind="{ row, index }">
            <template v-for="column in columns" :key="column">
              <slot :name="column" :value="row[column.property]" v-bind="{ column, row }">
                <p-table-data>
                  {{ row[column.property] }}
                </p-table-data>
              </slot>
            </template>
          </slot>
        </p-table-row>
      </template>
    </slot>
  </tbody>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import PTableData from './PTableData.vue'
  import PTableRow from './PTableRow.vue'
  import { TableColumn } from '@/types/tables'

  withDefaults(defineProps<{
    data?: Record<string, unknown>[],
    columns?: TableColumn[],
  }>(), {
    data: () => [],
    columns: () => [],
  })
</script>

<style>
.p-table-body { @apply
  divide-y
  divide-gray-200
  bg-white
}
</style>