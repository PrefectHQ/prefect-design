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
        <r-combobox v-model="exampleCombobox" :disabled="disabled" allow-deselect :options="exampleOptions" :state="exampleState" />

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
        <r-combobox
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
        <r-combobox v-model="exampleCombobox2" :disabled="disabled" allow-unknown-value :options="['Tim', 'Jeffrey', 'Elon']" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleCombobox2) }}
        </p-code>
      </div>
    </template>

    <template #grouped>
      <div class="combobox__demo">
        <p-combobox v-model="exampleCombobox3" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />
        <r-combobox v-model="exampleCombobox3" :disabled="disabled" :options="exampleOptionsGrouped" :state="exampleState" />

        <p-code inline>
          value: {{ JSON.stringify(exampleCombobox3) }}
        </p-code>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import RCombobox from '@/components/Combobox/RCombobox.vue'
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

    // Add a bunch of options for scrolling
    { value: 'junk', label: 'junk' },
    { value: 'junk1', label: 'junk1' },
    { value: 'junk2', label: 'junk2' },
    { value: 'junk3', label: 'junk3' },
    { value: 'junk4', label: 'junk4' },
    { value: 'junk5', label: 'junk5' },
    { value: 'junk6', label: 'junk6' },
    { value: 'junk7', label: 'junk7' },
    { value: 'junk8', label: 'junk8' },
    { value: 'junk9', label: 'junk9' },
    { value: 'junk10', label: 'junk10' },
    { value: 'junk11', label: 'junk11' },
    { value: 'junk12', label: 'junk12' },
    { value: 'junk13', label: 'junk13' },
    { value: 'junk14', label: 'junk14' },
    { value: 'junk15', label: 'junk15' },
    { value: 'junk16', label: 'junk16' },
    { value: 'junk17', label: 'junk17' },
    { value: 'junk18', label: 'junk18' },
    { value: 'junk19', label: 'junk19' },
    { value: 'junk20', label: 'junk20' },
    { value: 'junk21', label: 'junk21' },
    { value: 'junk22', label: 'junk22' },
    { value: 'junk23', label: 'junk23' },
    { value: 'junk24', label: 'junk24' },
    { value: 'junk25', label: 'junk25' },
    { value: 'junk26', label: 'junk26' },
    { value: 'junk27', label: 'junk27' },
    { value: 'junk28', label: 'junk28' },
    { value: 'junk29', label: 'junk29' },
    { value: 'junk30', label: 'junk30' },
    { value: 'junk31', label: 'junk31' },
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
.combobox__demo { @apply
  flex
  flex-col
  gap-4
}
</style>