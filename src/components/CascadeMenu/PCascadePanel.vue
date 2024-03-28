<template>
  <PCard class="p-cascade-panel">
    <slot v-bind="panel" />
  </PCard>
</template>

<script lang="ts" setup>
  import { PCard } from '@/components'
  import { useCascadePanel, CascadePanelId } from '@/compositions'

  const props = defineProps<{
    id: CascadePanelId,
  }>()

  const panel = useCascadePanel(() => props.id)
</script>

<style>
.p-cascade-panel { @apply
  flex
  w-min
}
</style>