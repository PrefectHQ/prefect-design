<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <p-icon icon="Search" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      class="p-command-input"
    />
  </div>
</template>

<script setup lang="ts">
  import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'

  defineOptions({
    inheritAttrs: false,
  })

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<ComboboxInputProps>()
  const forwardedProps = useForwardProps(props)
</script>

<style>
.p-command-input{
  @apply
  flex
  h-11
  w-full
  rounded-md
  bg-transparent
  py-3
  px-0
  text-sm
  outline-none
  focus:ring-0
  border-none
  placeholder:text-muted-foreground
  disabled:cursor-not-allowed
  disabled:opacity-50;
}
</style>