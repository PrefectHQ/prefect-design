<template>
  <AccordionItem
    v-bind="props"
    class="border-b"
  >
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
  import { AccordionItem, type AccordionItemProps } from 'radix-vue'
  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<AccordionItemProps>()
</script>