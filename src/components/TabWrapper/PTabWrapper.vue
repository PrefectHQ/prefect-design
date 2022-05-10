<template>
  <p-tab v-for="(tab, index) in tabs" :key="tab" :active="selectedIndex === index" @click="selectTab(index)">
    <slot :name="`tab-heading-${index}`" :tab="tab" :index="index">
      {{ tab }}
    </slot>
  </p-tab>

  <div class="mt-5">
    <slot name="tab-content" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { PTab } from '@/components/Tab'

  const selectedIndex = ref()

  const props = defineProps<{
    modelValue:  number,
    tabs: string[],
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: number): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: number) {
      emits('update:modelValue', value)
    },
  })
  function selectTab(index: number): void {
    internalValue.value = index
    selectedIndex.value = index
  }
</script>
