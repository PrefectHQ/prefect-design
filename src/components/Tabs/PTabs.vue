<template>
  <section class="p-tabs">
    <ul class="p-tabs__tabs" role="tablist" aria-label="Tab">
      <p-tab
        v-for="(tab, index) in innerTabs"
        :id="kebabCase(tab.label)"
        :key="tab.label"
        :active="selectedTab === tab.label"
        :disabled="tab.disabled"
        :area-controls="`${kebabCase(tab.label)}-content`"
        @click="selectTab(tab)"
        @keydown.enter.space.prevent="handleKeyDown(tab)"
      >
        <slot :name="`${kebabCase(tab.label)}-heading`" v-bind="scope(tab, index)">
          {{ tab.label }}
        </slot>
      </p-tab>
    </ul>

    <template v-for="tab in innerTabs" :key="tab">
      <section
        v-if="selectedTab === tab.label"
        :id="`${kebabCase(tab.label)}-content`"
        class="p-tabs__content"
        role="tabpanel"
        :aria-labelledby="`${kebabCase(tab.label)}`"
      >
        <slot :name="kebabCase(tab.label)" />
      </section>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'
  import { PTab } from '@/components/Tab/PTab.vue'
  import { Tab, areTabs } from '@/types/tabs'
  import { kebabCase } from '@/utilities/strings'

  const selectedTab = ref()

  const props = defineProps<{
    tabs: string[] | Tab[],
  }>()

  const emits = defineEmits<{
    (event: 'tab', value: string | Tab): void,
  }>()

  const innerTabs = computed<Tab[]>(() => {
    if (areTabs(props.tabs)) {
      return props.tabs
    }

    return props.tabs.map(label => ({ label }))
  })

  function selectTab(tab: Tab): void {
    const value = areTabs(props.tabs) ? tab : tab.label
    selectedTab.value = tab.label

    emits('tab', value)
  }

  function handleKeyDown(tab: Tab): void {
    if (tab.disabled) {
      return
    }

    selectTab(tab)
  }

  function scope(tab: Tab, index: number): { tab: string | Tab, index: number } {
    if (areTabs(props.tabs)) {
      return { tab, index }
    }

    return { tab: tab.label, index }
  }

  onMounted(() => {
    const [firstTab] = innerTabs.value

    selectedTab.value = firstTab.label
  })
</script>

<style>
.p-tabs__tabs { @apply
  border-b
  border-gray-200
  flex
  items-center
  -mb-px
  cursor-pointer
}

.p-tabs__content { @apply
  mt-5
}
</style>
