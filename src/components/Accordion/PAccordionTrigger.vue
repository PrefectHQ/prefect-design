<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
      :class="props.class"
    >
      <slot />
      <slot name="icon">
        <p-icon
          icon="ChevronDownIcon"
          class="h-4 w-4 shrink-0 transition-transform duration-200"
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