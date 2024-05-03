<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    class="p-dropdown-menu-checkbox-item"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <PIcon icon="Check" class="w-4 h-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>

<script setup lang="ts">
  import {
    DropdownMenuCheckboxItem,
    type DropdownMenuCheckboxItemEmits,
    type DropdownMenuCheckboxItemProps,
    DropdownMenuItemIndicator,
    useForwardPropsEmits
  } from 'radix-vue'
  import PIcon from '@/components/Icon/PIcon.vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuCheckboxItemProps>()
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-dropdown-menu-checkbox-item {
  @apply
    relative
    flex
    cursor-default
    select-none
    items-center
    rounded-sm
    py-1.5
    pl-8
    pr-2
    text-sm
    outline-none
    transition-colors
    focus:bg-accent
    focus:text-accent-foreground
    data-[disabled]:pointer-events-none
    data-[disabled]:opacity-50
}
</style>