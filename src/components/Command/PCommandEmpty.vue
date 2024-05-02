<template>
  <ComboboxEmpty v-bind="props" class="py-6 text-center text-sm">
    <slot />
  </ComboboxEmpty>
</template>

<script setup lang="ts">
  import { ComboboxEmpty, type ComboboxEmptyProps } from 'radix-vue'


  const props = defineProps<ComboboxEmptyProps>()
</script>
