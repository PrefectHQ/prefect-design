<template>
  <ComponentPage title="Native Time Input" :demos="[{ title: 'Native Time Input' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #native-time-input>
      <p-label :message="JSON.stringify(exampleDate)" :state="exampleState">
        <p-native-time-input
          v-model="exampleDate"
          :min="minDate"
          :max="maxDate"
          :disabled="disabled"
          :state="exampleState"
        />
      </p-label>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const exampleDate = ref<Date | null>()
  const minDate = ref<Date | null>(null)
  const maxDate = ref<Date | null>(null)
</script>