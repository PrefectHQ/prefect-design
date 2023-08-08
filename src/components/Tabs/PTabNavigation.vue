<template>
  <ul class="p-tab-navigation" role="tablist" aria-label="Tab">
    <template v-for="(tab, index) in tabs" :key="tab.label">
      <PTab
        :id="kebabCase(tab.label)"
        :active="selected === tab.label"
        :disabled="tab.disabled"
        :area-controls="`${kebabCase(tab.label)}-content`"
        @click="selected = tab.label"
        @keydown.enter.space.prevent="handleSpaceDown(tab)"
      >
        <slot
          :name="`${kebabCase(tab.label)}-heading`"
          v-bind="{ tab, index }"
        >
          <slot name="heading" v-bind="{ tab, index }">
            {{ tab.label }}
          </slot>
        </slot>
      </PTab>
    </template>
  </ul>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PTab from '@/components/Tab/PTab.vue'
  import { Tab, normalizeTab } from '@/types'
  import { kebabCase } from '@/utilities/strings'

  const props = defineProps<{
    tabs: (string | Tab)[],
    selected?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string): void,
  }>()

  const tabs = computed(() => props.tabs.map(normalizeTab))

  const selected = computed({
    get() {
      if (props.selected) {
        return props.selected
      }

      const [first] = tabs.value

      return first.label
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  function handleSpaceDown(tab: Tab): void {
    if (tab.disabled) {
      return
    }

    selected.value = tab.label
  }
</script>

<style>
.p-tab-navigation { @apply
  border-b
  border-divider
  flex
  items-center
  -mb-px
}
</style>