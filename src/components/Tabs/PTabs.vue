<template>
  <section>
    <ul class="p-tab" role="tablist" aria-label="Tab">
      <p-tab
        v-for="(tab, index) in tabs"
        :id="kebabCase(tab)"
        :key="tab"
        :active="selectedTab === tab"
        :area-controls="`${kebabCase(tab)}-content`"
        @click="selectTab(tab)"
        @keydown.enter.space="handleKeyDown(tab, $event)"
      >
        <slot :name="`${kebabCase(tab)}-heading`" v-bind="{ tab, index }">
          {{ tab }}
        </slot>
      </p-tab>
    </ul>

    <template v-for="tab in tabs" :key="tab">
      <section
        v-if="selectedTab === tab"
        :id="`${kebabCase(tab)}-content`"
        class="p-tabs__content"
        role="tabpanel"
        :aria-labelledby="`${kebabCase(tab)}`"
      >
        <slot :name="kebabCase(tab)" />
      </section>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { PTab } from '@/components/Tab'
  import { kebabCase } from '@/utilities/strings'

  const selectedTab = ref()

  const props = defineProps<{
    tabs: string[],
  }>()

  const emits = defineEmits<{
    (event: 'tab', value: string): void,
  }>()

  function selectTab(tab: string): void {
    selectedTab.value = tab
    emits('tab', tab)
  }

  function handleKeyDown(tab: string, event: Event): void {
    const tabEl = event.target as HTMLElement
    if (tabEl.classList.contains('p-tab__disabled')) {
      return
    }
    selectTab(tab)
  }

  onMounted(() => {
    const [firstTab] = props.tabs
    selectedTab.value = firstTab
  })
</script>

<style>
.p-tabs__content { @apply
  mt-5
}

.p-tab { @apply
  border-b
border-gray-200
  flex
  items-center
  -mb-px
  cursor-pointer
}
</style>
