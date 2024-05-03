<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    class="p-dropdown-menu-subcontent"
  >
    <slot />
  </DropdownMenuSubContent>
</template>

<script setup lang="ts">
  import {
    DropdownMenuSubContent,
    type DropdownMenuSubContentEmits,
    type DropdownMenuSubContentProps,
    useForwardPropsEmits
  } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DropdownMenuSubContentProps>()
  const emits = defineEmits<DropdownMenuSubContentEmits>()


  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-dropdown-menu-subcontent{
  @apply
    z-50
    min-w-32
    overflow-hidden
    rounded-md
    border
    bg-popover
    p-1
    text-popover-foreground
    shadow-lg
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2
    data-[side=left]:slide-in-from-right-2
    data-[side=right]:slide-in-from-left-2
    data-[side=top]:slide-in-from-bottom-2
}
</style>