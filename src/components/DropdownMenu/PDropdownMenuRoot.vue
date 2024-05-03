<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
  import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuRootProps>()
  const emits = defineEmits<DropdownMenuRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>
