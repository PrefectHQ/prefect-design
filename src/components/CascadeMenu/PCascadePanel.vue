<template>
  <div class="p-cascade-panel">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { useCascadePanel, CascadePanelId } from '@/compositions'

  const props = defineProps<{
    panelId: CascadePanelId,
  }>()

  useCascadePanel(() => props.panelId)
</script>

<style>
.p-cascade-panel { @apply
  pointer-events-auto
  h-min
}
</style>