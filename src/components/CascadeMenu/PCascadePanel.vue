<template>
  <div class="p-cascade-panel">
    <slot v-bind="panel" />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import { useCascadePanel, CascadePanelId, cascadePanelKey } from '@/compositions'

  const props = defineProps<{
    panelId: CascadePanelId,
  }>()

  const panel = useCascadePanel(() => props.panelId)
  provide(cascadePanelKey, panel)
</script>

<style>
.p-cascade-panel { @apply
  pointer-events-auto
  h-min
}
</style>