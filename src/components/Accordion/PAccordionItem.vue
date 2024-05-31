<template>
  <AccordionItem
    v-bind="props"
    class="border-b"
    :class="attrClasses"
    :style="attrStyles"
  >
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
  import { AccordionItem, type AccordionItemProps } from 'radix-vue'
  import { useAttrsStylesAndClasses } from '@/compositions'

  const { classes: attrClasses, styles: attrStyles } = useAttrsStylesAndClasses()

  const props = defineProps<AccordionItemProps>()
</script>