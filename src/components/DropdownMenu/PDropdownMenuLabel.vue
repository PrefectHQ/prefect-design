<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    class="p-dropdown-menu-label"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<script setup lang="ts">
  import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuLabelProps>()


  const forwardedProps = useForwardProps(props)
</script>


<style>
.p-dropdown-menu-label{
  @apply
  px-2
  py-1.5
  text-sm
  font-semibold
}
</style>