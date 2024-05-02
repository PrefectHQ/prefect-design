<template>
  <DropdownMenuSeparator v-bind="props" class="-mx-1 my-1 h-px bg-muted" />
</template>

<script setup lang="ts">
  import {
    DropdownMenuSeparator,
    type DropdownMenuSeparatorProps
  } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuSeparatorProps>()
</script>
