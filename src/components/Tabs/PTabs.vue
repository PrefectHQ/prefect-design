<template>
  <section
    class="p-tabs"
  >
    <p-tab v-for="(tab, index) in tabs" :key="tab" :active="selectedTab === tab" @click="selectTab(tab)">
      <slot :name="`${kebabCase(tab)}-heading`" v-bind="{ tab, index }">
        {{ tab }}
      </slot>
    </p-tab>
  </section>


  <template v-for="tab in tabs" :key="tab">
    <section v-if="selectedTab === tab" :id="`_${kebabCase(tab)}-panel`" class="p-tabs__content" role="tabpanel" :aria-labelledby="`_${kebabCase(tab)}`">
      <slot :name="kebabCase(tab)" />
    </section>
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
    (event: 'tab', value: string): void,
  }>()

  function selectTab(tab: string): void {
    selectedTab.value = tab
    emits('tab', tab)
  }
</script>

<style>
.p-tabs { @apply
  flex
  border-b-2
  border-slate-200
}
.p-tabs__content { @apply
  mt-5
}
</style>
