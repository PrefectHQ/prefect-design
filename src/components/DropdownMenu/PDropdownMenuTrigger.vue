<template>
  <DropdownMenuTrigger class="outline-none" v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>

<script setup lang="ts">
  import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuTriggerProps>()

  const forwardedProps = useForwardProps(props)
</script>
