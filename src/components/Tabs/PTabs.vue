<template>
  <section>
    <section class="p-tabs">
      <ul class="p-tabs__ul" role="tablist" aria-label="Tab">
        <p-tab
          v-for="(tab, index) in tabs"
          :id="kebabCase(tab)"
          :key="tab"
          :active="selectedTab === tab"
          :area-controls="`${kebabCase(tab)}-content`"
          @click="selectTab(tab)"
          @keydown.enter.space="handleKeydown"
        >
          <slot :name="`${kebabCase(tab)}-heading`" v-bind="{ tab, index }">
            {{ tab }}
          </slot>
        </p-tab>
      </ul>
    </section>
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

  function handleKeydown(event: Event): void {
    const tab = event.target as HTMLElement

    if (tab.classList.contains('p-tab__disabled')) {
      return
    }

    if (tab.textContent) {
      selectedTab.value = tab.textContent
    }
  }

  onMounted(() => {
    const [firstTab] = props.tabs
    selectedTab.value = firstTab
  })
</script>

<style>
.p-tabs { @apply
  border-b
  border-slate-200
}

.p-tabs__content { @apply
  mt-5
}

.p-tabs__ul { @apply
  cursor-pointer
  flex
  items-center
}
</style>
