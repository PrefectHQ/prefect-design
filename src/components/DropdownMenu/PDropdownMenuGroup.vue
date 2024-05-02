<template>
  <DropdownMenuGroup v-bind="props">
    <slot />
  </DropdownMenuGroup>
</template>

<script setup lang="ts">
  import { DropdownMenuGroup, type DropdownMenuGroupProps } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuGroupProps>()
</script>
