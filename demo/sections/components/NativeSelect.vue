<template>
  <ComponentPage title="Native Select" :demos="[{ title: 'Native Select' }, { title: 'Grouped' }]">
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #native-select>
      <div class="native-select__demo">
        <p-native-select v-model="exampleNativeSelect" :disabled="disabled" :options="exampleOptionsWithEmpty" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleNativeSelect) }}
        </p-code>
      </div>
    </template>

    <template #grouped>
      <div class="native-select__demo">
        <p-native-select v-model="exampleNativeSelectGrouped" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleNativeSelectGrouped) }}
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

  const exampleNativeSelect = ref(null)
  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    {
      label: 'One', value: 1,
    },
    {
      label: 'Two', value: 2, disabled: true,
    },
    {
      label: 'Three', value: 3,
    },
  ]

  const exampleNativeSelectGrouped = ref(null)
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
</script>

<style>
  .native-select__demo {
    @apply
    flex
    flex-col
    gap-4
  }
</style>