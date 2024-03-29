<template>
  <PCard v-if="isOpen" class="p-cascade-panel">
    <slot v-bind="{ ...panel }" />
  </PCard>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PCard } from '@/components'
  import { useCascadePanel, CascadePanelId } from '@/compositions'

  const props = defineProps<{
    panelId: CascadePanelId,
  }>()

  const panel = useCascadePanel(() => props.panelId)
  const isOpen = computed(() => panel.isOpen.value)
</script>

<style>
.p-cascade-panel { @apply
  flex
  w-min
}
</style>