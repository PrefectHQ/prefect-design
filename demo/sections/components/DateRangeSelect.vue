<template>
  <ComponentPage title="Date Range Select" :demos="[{ title: 'Date Range Select' }, { title: 'Date Range Select Small' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
      <p-content secondary>
        <p-checkbox v-model="clearable" :disabled="disabled" label="Clearable" />
        <div class="flex gap-2">
          <p-date-input v-model="min" />
          <p-date-input v-model="max" />
        </div>
      </p-content>
    </template>

    <template #date-range-select>
      <p-content>
        <p-date-range-select v-model="value" v-bind="{ min, max, clearable, disabled, minReason, maxReason }" />
        <p-code inline>
          value: {{ JSON.stringify(value) }}
        </p-code>
      </p-content>
    </template>
    <template #date-range-select-small>
      <p-content>
        <p-date-range-select v-model="value" v-bind="{ min, max, clearable, disabled, minReason, maxReason }" size="sm">
          <p-code inline>
            value: {{ JSON.stringify(value) }}
          </p-code>
        </p-date-range-select>
      </p-content>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { DateRangeSelectValue, State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const value = ref<DateRangeSelectValue>({ type: 'span', seconds: -604800 })
  const min = ref<Date>()
  const max = ref<Date>()
  const minReason = ref('min reason')
  const maxReason = ref('max reason')
  const clearable = ref(false)
</script>