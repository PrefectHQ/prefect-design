<template>
  <ComponentPage title="Date Range Select" :demos="[{ title: 'Date Range Select' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #date-range-select>
      <p-content>
        <p-date-range-select v-model="value" />
        <p-code inline>
          value: {{ JSON.stringify(value) }}
        </p-code>
        <div class="flex justify-start gap-4">
          <p-checkbox v-model="isClearableDate" :disabled="disabled" label="Clearable" />
        </div>
        <div class="flex gap-4 w-1/2">
          <p-label label="Min Value" :message="minDate ? format(minDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="minDate" :disabled="disabled" :state="exampleState" />
          </p-label>

          <p-label label="Max Value" :message="maxDate ? format(maxDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="maxDate" :disabled="disabled" :state="exampleState" />
          </p-label>
        </div>
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
  const minDate = ref<Date | null>(null)
  const maxDate = ref<Date | null>(null)
  const isClearableDate = ref(false)
</script>