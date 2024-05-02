<template>
  <ComboboxItem
    v-bind="forwarded"
    class="p-command-item"
  >
    <slot />
  </ComboboxItem>
</template>

<script setup lang="ts">
  import { ComboboxItem, useForwardPropsEmits, type ComboboxItemEmits, type ComboboxItemProps } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<ComboboxItemProps>()
  const emits = defineEmits<ComboboxItemEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-command-item {
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
  data-[highlighted]:bg-accent
  data-[disabled]:pointer-events-none
  data-[disabled]:opacity-50;
}
</style>