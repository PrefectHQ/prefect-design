<template>
  <ComponentPage
    title="Select"
    :demos="[
      { title: 'Single Select' },
      { title: 'Multi-Select' },
      { title: 'Grouped' },
      { title: 'Readonly options' },
    ]"
  >
    <template #description>
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

        <p-code inline>
          value: {{ JSON.stringify(exampleSelect) }}
        </p-code>
      </div>
    </template>
    <template #multi-select>
      <div class="select__demo">
        <p-select v-model="exampleMultiSelect" :disabled="disabled" :options="exampleOptions" :state="exampleState" multiple />

        <p-code inline>
          value: {{ JSON.stringify(exampleMultiSelect) }}
        </p-code>
      </div>
    </template>
    <template #grouped>
      <div class="select__demo">
        <p-select v-model="exampleGroupedSelect" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleGroupedSelect) }}
        </p-code>
      </div>
    </template>

    <template #readonly>
      <div class="select__demo">
        <p-select v-model="readonlySelected" :disabled="disabled" :options="readonlyOptions" :state="exampleState" />

        <p-code inline>
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
  const exampleMultiSelect = ref<string[] | undefined>(undefined)
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

  const exampleOptionsGrouped = [
    { label: 'This option is not grouped', value: 'No Group' },
    {
      label: 'Here are some neutral colors',
      options: [
        { label: 'Slate', value: 'Slate' },
        { label: 'Stone', value: 'Stone' },
        { label: 'Gray', value: 'Gray' },
      ],
    },
    {
      label: 'Here are some German car brands',
      options: [
        { label: 'Audi', value: 'Audi' },
        { label: 'BMW', value: 'BMW' },
        { label: 'Mercedes', value: 'Mercedes' },
      ],
    },
  ]

  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    ...exampleOptions,
  ]

  const readonlySelected = ref()
  const readonlyOptions = ['one', 'two', 'three'] as const
</script>

<style>
  .select__demo {
    @apply
    flex
    flex-col
    gap-4
  }
</style>