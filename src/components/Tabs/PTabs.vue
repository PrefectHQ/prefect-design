<template>
  <section class="p-tabs">
    <div class="p-tabs--mobile">
      <label for="tabs" class="p-tabs--mobile__label">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <p-select
        id="tabs"
        v-model="selectedTab"
        :options="options"
        name="tabs"
        class="p-tabs--mobile__select"
      >
        <option
          v-for="tab in innerTabs"
          :key="kebabCase(tab.label)"
          :selected="selectedTab === tab.label"
        >
          {{ tab.label }}
        </option>
      </p-select>
    </div>
    <div class="p-tabs--not-mobile">
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
          <slot
            :name="`${kebabCase(tab.label)}-heading`"
            v-bind="scope(tab, index)"
          >
            {{ tab.label }}
          </slot>
        </p-tab>
      </ul>
    </div>
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
  import PSelect from '@/components/Select/PSelect.vue'
  import PTab from '@/components/Tab/PTab.vue'
  import { Tab, areTabs } from '@/types/tabs'
  import { kebabCase } from '@/utilities/strings'

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

    return props.tabs.map((label) => ({ label }))
  })

  const selectedTab = ref(innerTabs.value[0].label)
  const options = computed(() => innerTabs.value.map((tab) => tab.label))

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
.p-tabs--mobile {
  @apply sm:hidden;
}

.p-tabs--mobile__label {
  @apply sr-only;
}

.p-tabs--mobile__select {
  @apply
  block
  w-full
  pl-3
  pr-10
  py-2 text-base
border-gray-300
  focus:outline-none
focus:ring-indigo-500
focus:border-indigo-500
  sm:text-sm
  rounded-md;
}

.p-tabs--not-mobile {
  @apply hidden sm:block;
}
.p-tabs__tabs {
  @apply
  border-b
  border-gray-200
  flex
  items-center
  -mb-px
  cursor-pointer;
}

.p-tabs__content {
  @apply mt-5;
}
</style>
