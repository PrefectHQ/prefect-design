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
  import { AccordionItem, type AccordionItemProps, useForwardProps } from 'radix-vue'
  import { useAttrsStylesAndClasses } from '@/compositions'

  const { classes: attrClasses, styles: attrStyles } = useAttrsStylesAndClasses()


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<AccordionItemProps>()
</script>