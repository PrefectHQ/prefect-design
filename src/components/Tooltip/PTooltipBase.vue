<template>
  <TooltipRoot v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>

<script setup lang="ts">
  import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useForwardPropsEmits } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<TooltipRootProps>()
  const emits = defineEmits<TooltipRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>