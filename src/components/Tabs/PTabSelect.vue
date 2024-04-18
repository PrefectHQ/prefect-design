<template>
  <p-label label="Select a tab" :for="id" class="p-tab-select__label" />
  <PSelect
    :id="id"
    v-model="selected"
    class="p-tab-select"
    :options="options"
    name="tabs"
  >
    <template #option="{ option: tab, index }">
      <slot :name="`${kebabCase(tab.label)}-heading`" :tab :index>
        <slot name="heading" :tab :index>
          {{ tab.label }}
        </slot>
      </slot>
    </template>
    <template #default="{ label }">
      <slot :name="`${kebabCase(label)}-heading`" v-bind="getSlotScope(label)">
        <slot name="heading" v-bind="getSlotScope(label)" />
      </slot>
    </template>
  </PSelect>
</template>

<script lang="ts" setup generic="T extends string">
  import { VNode, computed } from 'vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import { Tab, normalizeTab } from '@/types'
  import { randomId } from '@/utilities'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    tabs: (T | Tab<T>)[],
    selected?: T,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: T): void,
  }>()

  type HeadingSlots = Record<`${string}-heading`, (props: { tab: Tab<T>, index: number }) => VNode>
  type HeadingSlot = { heading: (props: { tab: Tab<T>, index: number }) => VNode }

  defineSlots<HeadingSlots & HeadingSlot>()

  const id = randomId()

  const normalizedTabs = computed(() => props.tabs.map(tab => normalizeTab(tab)))

  const options = computed(() => normalizedTabs.value.map(tab => ({
    ...tab,
    value: tab.label,
  })))

  const selected = computed({
    get() {
      if (props.selected) {
        return props.selected
      }

      const [first] = options.value

      return first.label
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  function getSlotScope(label: string): { tab: Tab<T>, index: number } {
    const index = normalizedTabs.value.findIndex(tab => tab.label === label)
    const tab = normalizedTabs.value[index]

    return {
      tab,
      index,
    }
  }
</script>

<style>
.p-tab-select__label { @apply
  sr-only
}
</style>