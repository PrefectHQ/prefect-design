<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    class="p-dropdown-menu-item"
  >
    <slot />
  </DropdownMenuItem>
</template>

<script setup lang="ts">
  import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuItemProps>()
  const forwardedProps = useForwardProps(props)
</script>

<style>
.p-dropdown-menu-item {
  @apply
    relative
    flex
    cursor-default
    select-none
    items-center
    rounded-sm
    px-2
    py-1.5
    text-sm
    outline-none
    transition-colors
    focus:bg-accent
    focus:text-accent-foreground
    data-[disabled]:pointer-events-none
    data-[disabled]:opacity-50
}
</style>