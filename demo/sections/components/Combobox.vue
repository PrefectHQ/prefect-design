<template>
  <ComponentPage
    title="Combobox"
    :demos="[
      { title: 'Combobox' },
      { title: 'Multiple' },
      { title: 'Allows custom values' },
      { title: 'Grouped' },
    ]"
  >
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #combobox>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox" :disabled="disabled" allow-deselect :options="exampleOptions" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleCombobox) }}
        </p-code>
      </div>
    </template>

    <template #multiple>
      <div class="combobox__demo">
        <p-combobox
          v-model="exampleMultiple"
          :disabled="disabled"
          allow-deselect
          :options="exampleOptions"
          :state="exampleState"
          multiple
        />

        <p-code inline>
          value: {{ JSON.stringify(exampleMultiple) }}
        </p-code>
      </div>
    </template>

    <template #allows-custom-values>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox2" :disabled="disabled" allow-unknown-value :options="['Tim', 'Jeffrey', 'Elon']" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleCombobox2) }}
        </p-code>
      </div>
    </template>

    <template #grouped>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox3" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleCombobox3) }}
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

  const exampleCombobox = ref('Space-X')
  const exampleMultiple = ref<string[] | undefined>()
  const exampleCombobox2 = ref([])
  const exampleCombobox3 = ref([])

  const exampleOptions = [
    { label: 'Tim Cook', value: 'Apple' },
    { label: 'Satya Nadella', value: 'Microsoft' },
    { label: 'Jeffrey Bezos', value: 'Amazon', disabled: true },
    { label: 'Sundar Pichai', value: 'Google' },
    { label: 'Elon Musk', value: 'Space-X' },
    { label: 'Mark Lizardking', value: 'Facebook' },
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
</script>

<style>
  .combobox__demo {
    @apply
    h-80
    flex
    flex-col
    gap-4
  }
</style>