<template>
  <DropdownMenuSub v-bind="forwarded">
    <slot />
  </DropdownMenuSub>
</template>

<script setup lang="ts">
  import {
    DropdownMenuSub,
    type DropdownMenuSubEmits,
    type DropdownMenuSubProps,
    useForwardPropsEmits
  } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuSubProps>()
  const emits = defineEmits<DropdownMenuSubEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>
