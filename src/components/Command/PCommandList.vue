<template>
  <ComboboxContent v-bind="forwarded" class="p-command-list">
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>

<script setup lang="ts">
  import { ComboboxContent, useForwardPropsEmits, type ComboboxContentEmits, type ComboboxContentProps } from 'radix-vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = withDefaults(defineProps<ComboboxContentProps>(), {
    dismissable: false,
  })
  const emits = defineEmits<ComboboxContentEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-command-list {
  @apply
  max-h-[300px]
  overflow-y-auto
  overflow-x-hidden;
}
</style>