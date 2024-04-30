
<template>
  <AccordionRoot v-bind="forwarded" type="single" :collapsible="true">
    <AccordionItem v-for="section in sections" :key="section" :value="section">
      <AccordionTrigger>
        <slot name="heading" :section="section">
          {{ section }}
        </slot>
      </AccordionTrigger>
      <AccordionContent>
        <slot name="content" :section="section" />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<script setup lang="ts" generic="const T extends string">
  import {
    AccordionRoot,
    type AccordionRootEmits,
    type AccordionRootProps,
    useForwardPropsEmits
  } from 'radix-vue'

  import AccordionContent from '@/components/Accordion/PAccordionContent.vue'
  import AccordionItem from '@/components/Accordion/PAccordionItem.vue'
  import AccordionTrigger from '@/components/Accordion/PAccordionTrigger.vue'

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<AccordionRootProps & {
    sections?: T[],
  }>()
  const emits = defineEmits<AccordionRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
</script>
