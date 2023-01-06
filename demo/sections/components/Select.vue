<template>
  <ComponentPage title="Select" :demos="[{ title: 'Single Select' }, { title: 'Multi-Select' }, { title: 'Grouped' }]">
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
    <template #grouped>
      <div class="select__demo">
        <p-select v-model="exampleGroupedSelect" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code>
          value: {{ JSON.stringify(exampleGroupedSelect) }}
        </p-code>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { SelectOption, State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const exampleSelect = ref(null)
  const exampleMultiSelect = ref<string[]>([])
  const exampleGroupedSelect = ref(null)

  const exampleOptions: SelectOption[] = [
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

  const exampleOptionsGrouped: (string | number | boolean | SelectOption)[] = [
    { label: 'This option is not grouped', value: 'No Group' },
    { label: 'Black', value: 'Black', group: 'Here are some neutral colors' },
    { label: 'White', value: 'White', group: 'Here are some neutral colors' },
    { label: 'Slate', value: 'Slate', group: 'Here are some neutral colors' },
    { label: 'Stone', value: 'Stone', group: 'Here are some neutral colors' },
    { label: 'Gray', value: 'Gray', group: 'Here are some neutral colors' },
    { label: 'Audi', value: 'Audi', group: 'Here are some German car brands' },
    { label: 'BMW', value: 'BMW', group: 'Here are some German car brands' },
    { label: 'Mercedes', value: 'Gray', group: 'Here are some German car brands' },
  ]

  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    ...exampleOptions,
  ]
</script>

<style>
  .select__demo {
    @apply
    h-80
    flex
    flex-col
    gap-4
  }
</style>