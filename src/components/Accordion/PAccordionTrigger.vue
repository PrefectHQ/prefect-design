<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      class="p-accordion-trigger"
      :class="props.class"
    >
      <slot />
      <slot name="icon">
        <p-icon
          icon="ChevronDownIcon"
          class="p-accordion-trigger-icon"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<script setup lang="ts">
  import {
    AccordionHeader,
    AccordionTrigger,
    type AccordionTriggerProps
  } from 'radix-vue'
  import { type HTMLAttributes, computed } from 'vue'

  const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

  const delegatedProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
  })
</script>

<style>
.p-accordion-trigger {
  @apply
    cursor-pointer
    flex
    flex-1
    items-center
    justify-between
    py-4
    font-medium
    transition-all
    hover:underline
}

.p-accordion-trigger[data-state=open] > svg {
  @apply
    rotate-180
}

.p-accordion-trigger-icon {
  @apply
    h-4
    w-4
    shrink-0
    transition-transform
    duration-200
}
</style>