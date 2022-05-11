<template>
  <p-tab v-for="(tab, index) in tabs" :key="tab" :active="selectedTab === tab" @click="selectTab(tab)">
    <slot :name="`${kebabCase(tab)}-heading`" :tab="tab" :index="index">
      {{ tab }}
    </slot>
  </p-tab>

  <template v-for="tab in tabs" :key="tab">
    <div class="p-tab-wrapper__content">
      <slot v-if="selectedTab === tab" :name="kebabCase(tab)" />
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { PTab } from '@/components/Tab'
  import { kebabCase } from '@/utilities/strings'
  const selectedTab = ref()

  defineProps<{
    tabs: string[],
  }>()

  const emits = defineEmits<{
    (event: 'update:tab', value: string): void,
  }>()

  function selectTab(tab: string): void {
    selectedTab.value = tab
    emits('update:tab', tab)
  }
</script>

<style>
.p-tab-wrapper__content { @apply
  mt-5
}
</style>
