<template>
  <ComponentPage title="Date Range Input" :demos="[{ title: 'Date Range Input' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #date-range-input>
      <p-content class="date-input__demo">
        <p-date-range-input
          v-model:start-date="start"
          v-model:end-date="end"
          :show-time="showTimeInExampleDate"
          :clearable="isClearableDate"
          :disabled="disabled"
          :min="minDate"
          :max="maxDate"
          :state="exampleState"
        />
        <p-code inline>
          Start: {{ JSON.stringify(start) }}
        </p-code>
        <p-code inline>
          End: {{ JSON.stringify(start) }}
        </p-code>
        <div class="flex justify-start gap-4">
          <p-checkbox v-model="showTimeInExampleDate" :disabled="disabled" label="Show Time" />

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

  const start = ref<Date | null>()
  const end = ref<Date | null>()
  const minDate = ref<Date | null>(null)
  const maxDate = ref<Date | null>(null)
  const showTimeInExampleDate = ref(true)
  const isClearableDate = ref(false)
</script>

<style>
  .date-input__demo {
    @apply
    h-96
    flex
    flex-col
    gap-4
  }
</style>