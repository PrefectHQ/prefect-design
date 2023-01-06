<template>
  <ComponentPage
    title="Combobox"
    :demos="[
      { title: 'Combobox' },
      { title: 'Allows custom values' },
      { title: 'Grouped' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-combobox</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #combobox>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox" :disabled="disabled" allow-deselect :options="exampleOptions" :state="exampleState" />

        <p-code>
          value: {{ JSON.stringify(exampleCombobox) }}
        </p-code>
      </div>
    </template>

    <template #allows-custom-values>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox2" :disabled="disabled" allow-unknown-value :options="['Tim', 'Jeffrey', 'Elon']" :state="exampleState" />

        <p-code>
          value: {{ JSON.stringify(exampleCombobox2) }}
        </p-code>
      </div>
    </template>

    <template #grouped>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox3" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code>
          value: {{ JSON.stringify(exampleCombobox3) }}
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

  const exampleCombobox = ref('Space-X')
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

  const exampleOptionsGrouped: (string | number | boolean | SelectOption)[] = [
    { label: 'This option is not grouped', value: 'No Group' },
    { label: 'Black', value: 'Black', group: 'Here are some neutral colors' },
    { label: 'White', value: 'White', group: 'Here are some neutral colors' },
    { label: 'Slate', value: 'Slate', group: 'Here are some neutral colors' },
    { label: 'Stone', value: 'Stone', group: 'Here are some neutral colors' },
    { label: 'Gray', value: 'Gray', group: 'Here are some neutral colors' },
    { label: 'Audi', value: 'Audi', group: 'Here are some German car brands' },
    { label: 'BMW', value: 'BMW', group: 'Here are some German car brands' },
    { label: 'Mercedes', value: 'Mercedes', group: 'Here are some German car brands' },
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