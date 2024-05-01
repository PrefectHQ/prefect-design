<template>
  <AccordionContent
    v-bind="props"
    class="p-accordion-content"
  >
    <div class="pb-4 pt-0" v-bind="$attrs">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
  import { AccordionContent, type AccordionContentProps } from 'radix-vue'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<AccordionContentProps>()
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