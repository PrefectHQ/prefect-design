<template>
  <AccordionContent
    v-bind="props"
    class="p-accordion-content"
  >
    <div class="pb-4 pt-0" :class="attrClasses" :style="attrStyles" v-bind="attrs">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
  import { AccordionContent, type AccordionContentProps } from 'radix-vue'
  import { useAttrsStylesAndClasses } from '@/compositions'
  const props = defineProps<AccordionContentProps>()

  const { classes: attrClasses, styles: attrStyles, attrs } = useAttrsStylesAndClasses()
</script>

<style>
.p-accordion-content { @apply
    overflow-hidden
    text-sm
    transition-all
    data-[state=closed]:animate-accordion-up
    data-[state=open]:animate-accordion-down
}
</style>