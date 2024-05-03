<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    class="p-dropdown-menu-sub-trigger"
  >
    <slot />
    <PIcon icon="ChevronRightIcon" class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>

<script setup lang="ts">
  import {
    DropdownMenuSubTrigger,
    type DropdownMenuSubTriggerProps,
    useForwardProps
  } from 'radix-vue'
  import PIcon from '@/components/Icon/PIcon.vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuSubTriggerProps>()


  const forwardedProps = useForwardProps(props)
</script>

<style>
.p-dropdown-menu-sub-trigger {
  @apply
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
    data-[state=open]:bg-accent
}
</style>
