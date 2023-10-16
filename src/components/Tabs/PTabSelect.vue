<template>
  <p-label label="Select a tab" :for="id" class="p-tab-select__label" />
  <PSelect
    :id="id"
    v-model="selected"
    class="p-tab-select"
    :options="options"
    name="tabs"
  >
    <template #option="{ option, index }">
      <slot
        :name="`${kebabCase(option.label)}-heading`"
        v-bind="{ tab: option, index }"
      >
        <slot name="heading" v-bind="{ tab: option, index }">
          {{ option.label }}
        </slot>
      </slot>
    </template>
    <template #default="{ option, label }">
      <slot
        :name="`${kebabCase(label)}-heading`"
        v-bind="{ tab: option, index: options.findIndex(tab => tab.label === label) }"
      >
        <slot name="heading" v-bind="{ tab: option, index: options.findIndex(tab => tab.label === label) }" />
      </slot>
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import { Tab, normalizeTab } from '@/types'
  import { randomId } from '@/utilities'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    tabs: (string | Tab)[],
    selected?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string): void,
  }>()

  const id = randomId()

  const options = computed(() => props.tabs.map(tab => {
    const value = normalizeTab(tab)

    return {
      ...value,
      value: value.label,
    }
  }))

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
</script>

<style>
.p-tab-select__label { @apply
  sr-only
}
</style>