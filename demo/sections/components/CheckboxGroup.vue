<template>
  <ComponentPage title="Checkbox Group" :demos="[{ title: 'Checkbox Group' }, { title: 'Using Label Slot' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #checkbox-group>
      <div class="checkbox-group__demo">
        <p-checkbox-group v-model="value" :options="options" :disabled="disabled" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(value) }}
        </p-code>
      </div>
    </template>

    <template #using-label-slot>
      <div class="checkbox-group__demo">
        <p-checkbox-group v-model="slotValue" :options="options" :disabled="disabled" :state="exampleState">
          <template #label="{ option }">
            <strong>{{ option.label.toUpperCase() }}!!!</strong>
          </template>
        </p-checkbox-group>

        <p-code inline>
          value: {{ JSON.stringify(slotValue) }}
        </p-code>
      </div>
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

  const value = ref([])
  const slotValue = ref([])
  const options = ['first', 'second', 'third']
</script>

<style>
.checkbox-group__demo { @apply
  flex
  flex-col
  gap-4
}
</style>