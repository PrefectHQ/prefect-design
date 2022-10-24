<template>
  <ComponentPage title="Select" :demos="[{ title: 'Single Select' }, { title: 'Multi-Select' }]">
    <template #description>
      This is where we add a short description of <p-code>p-select</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #single-select>
      <div class="select__demo">
        <p-select
          v-model="exampleSelect"
          :disabled="disabled"
          allow-deselect
          :options="exampleOptionsWithEmpty"
          :state="exampleState"
        />

        <p-code>
          value: {{ JSON.stringify(exampleSelect) }}
        </p-code>
      </div>
    </template>
    <template #multi-select>
      <div class="select__demo">
        <p-select v-model="exampleMultiSelect" :disabled="disabled" :options="exampleOptions" :state="exampleState" />

        <p-code>
          value: {{ JSON.stringify(exampleMultiSelect) }}
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

  const exampleSelect = ref(null)
  const exampleMultiSelect = ref<string[]>([])

  const exampleOptions = [
    {
      label: 'One', value: '1',
    },
    {
      label: 'Two', value: '2', disabled: true,
    },
    {
      label: 'Three', value: '3',
    },
  ]
  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    ...exampleOptions,
  ]
</script>

<style>
  .select__demo {
    @apply
    h-48
    flex
    flex-col
    gap-4
  }
</style>