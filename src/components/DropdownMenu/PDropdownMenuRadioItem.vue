<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    class="p-dropdown-menu-radio-item"
  >
    <span class="p-dropdown-menu-radio-item-indicator">
      <DropdownMenuItemIndicator>
        <PIcon icon="StopIcon" class="h-2 w-2 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>

<script setup lang="ts">
  import {
    DropdownMenuItemIndicator,
    DropdownMenuRadioItem,
    type DropdownMenuRadioItemEmits,
    type DropdownMenuRadioItemProps,
    useForwardPropsEmits
  } from 'radix-vue'
  import PIcon from '@/components/Icon/PIcon.vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuRadioItemProps>()

  const emits = defineEmits<DropdownMenuRadioItemEmits>()


  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-dropdown-menu-radio-item {
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

.p-dropdown-menu-radio-item-indicator {
  @apply
    absolute
    left-2
    flex
    h-3.5
    w-3.5
    items-center
    justify-center
}
</style>