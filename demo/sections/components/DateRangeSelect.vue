<template>
  <ComponentPage title="Date Range Select" :demos="[{ title: 'Date Range Select' }, { title: 'Date Range Select Small' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
      <p-checkbox v-model="clearable" :disabled="disabled" label="Clearable" />
    </template>

    <template #date-range-select>
      <p-content>
        <p-date-range-select v-model="value" v-bind="{ min, max, clearable, disabled }" />
        <p-code inline>
          value: {{ JSON.stringify(value) }}
        </p-code>
      </p-content>
    </template>
    <template #date-range-select-small>
      <p-content>
        <p-date-range-select v-model="value" v-bind="{ min, max, clearable, disabled }" size="sm">
          <p-code inline>
            value: {{ JSON.stringify(value) }}
          </p-code>
        </p-date-range-select>
      </p-content>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { format } from 'date-fns'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const value = ref()
  const min = ref<Date>()
  const max = ref<Date>()
  const clearable = ref(true)
</script>