<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="p-accordion-content"
  >
    <div class="pb-4 pt-0" :class="props.class">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
  import { AccordionContent, type AccordionContentProps } from 'radix-vue'
  import { type HTMLAttributes, computed } from 'vue'

  const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

  const delegatedProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
  })
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