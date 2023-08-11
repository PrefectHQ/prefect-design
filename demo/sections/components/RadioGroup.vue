<template>
  <ComponentPage
    title="Radio Group"
    :demos="[
      { title: 'Radio Group' },
      { title: 'Using Label Slot' },
    ]"
  >
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #radio-group>
      <div class="radio-group__demo">
        <p-radio-group v-model="value" :options="options" :state="exampleState" :disabled="disabled" />

        <p-code inline>
          value: {{ JSON.stringify(value) }}
        </p-code>
      </div>
    </template>

    <template #using-label-slot>
      <div class="radio-group__demo">
        <p-radio-group v-model="slotValue" :options="options" :state="exampleState" :disabled="disabled">
          <template #label="{ option }">
            <p-code inline>
              {{ option.label }}
            </p-code>
          </template>
        </p-radio-group>

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

  const value = ref(null)
  const slotValue = ref(null)
  const options = ['first option', 'second option', 'third option']
</script>

<style>
.radio-group__demo { @apply
  flex
  flex-col
  gap-4
}
</style>