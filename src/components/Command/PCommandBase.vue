<template>
  <ComboboxRoot
    v-bind="forwarded"
    class="p-command"
  >
    <slot />
  </ComboboxRoot>
</template>

<script setup lang="ts">
  import { ComboboxRoot, useForwardPropsEmits, type ComboboxRootEmits, type ComboboxRootProps } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = withDefaults(defineProps<ComboboxRootProps>(), {
    open: true,
    modelValue: '',
  })

  const emits = defineEmits<ComboboxRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-command{
  @apply
  flex
  h-full
  w-full
  flex-col
  overflow-hidden
  rounded-md
  bg-popover
  text-popover-foreground;
}
</style>
