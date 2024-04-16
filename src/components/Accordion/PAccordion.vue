<template>
  <AccordionRoot type="single" :collapsible="true">
    <template v-for="section in sections" :key="section">
      <AccordionItem :value="section" class="p-accordion__item">
        <AccordionHeader class="p-accordion__header">
          <AccordionTrigger class="group p-accordion__trigger">
            <span>{{ section }}</span>
            <p-icon size="small" icon="ChevronDownIcon" class="p-accordion__icon" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="p-accordion__content">
          <slot name="content" :section="section" />
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>

<script lang="ts" setup generic="const T extends string">
  import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'
  import { ref } from 'vue'

  defineProps<{
    sections: T[],
  }>()
</script>

<style>
.p-accordion__header { @apply
  text-sm
  hover:underline
}

.p-accordion__item { @apply
  data-[state=open]:pb-4
  border-b-[.5px]
}

.p-accordion__trigger { @apply
  flex
  justify-between
  w-full
  py-4
}

.p-accordion__icon { @apply
  ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300
  group-aria-[expanded=true]:rotate-180
  my-auto
}

.p-accordion__content{ @apply
  overflow-hidden
  data-[state=open]:animate-accordion-down
  data-[state=closed]:animate-accordion-up
}
</style>