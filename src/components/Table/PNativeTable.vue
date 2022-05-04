TableNativeColumn<template>
  <div class="p-table-native">
    <table class="p-table-native__table">
      <thead class="p-table-native__header">
        <tr>
          <template v-for="column in columns" :key="column">
            <td class="p-table-native__heading" :style="getColumnStyle(column)">
              <slot :name="`${column}-heading`" v-bind="{ column }">
                {{ column.label }}
              </slot>
            </td>
          </template>
        </tr>
      </thead>
      <tbody class="p-table-native__body">
        <template v-for="(row, index) in data" :key="index">
          <tr>
            <template v-for="column in columns" :key="column">
              <td class="p-table-native__value">
                <slot :name="column" :value="row[column.property]" v-bind="{ column, row }">
                  {{ row[column.property] }}
                </slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
      <template v-if="slots.footer">
        <tfoot>
          <slot name="footer" />
        </tfoot>
      </template>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, StyleValue, useSlots } from 'vue'
  import { TableNativeColumn } from '@/types/tables'
  import { isStrings } from '@/utilities/arrays'
  import { convertStringsToTableColumns } from '@/utilities/tables'

  const props = defineProps<{
    data: Record<string, unknown>[],
    columns?: TableNativeColumn[],
  }>()

  const slots = useSlots()

  const columns = computed<TableNativeColumn[]>(() => {
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

  function getColumnStyle(column: TableNativeColumn): StyleValue {
    if (column.width === undefined) {
      return ''
    }

    return {
      width: column.width,
    }
  }
</script>

<style scoped>
.p-table-native { @apply
  overflow-hidden
  overflow-x-auto
  shadow
  ring-1
  ring-black
  ring-opacity-5
  md:rounded-lg
}
.p-table-native__table { @apply
  min-w-full
  divide-y
  divide-gray-300
}

.p-table-native__header { @apply
  bg-gray-50
}

.p-table-native__heading { @apply
  px-3
  py-3.5
  text-sm
  font-semibold
  text-gray-900
  whitespace-nowrap
}

.p-table-native__body { @apply
  divide-y
  divide-gray-200
  bg-white
}

.p-table-native__value { @apply
  whitespace-nowrap
  px-3
  py-4
  text-sm
  text-gray-500
}
</style>