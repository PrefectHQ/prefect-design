<template>
  <ComponentPage title="Accordion" description="A vertically stacked set of interactive headings that each reveal an associated section of content." :demos="[{ title: 'Accordion' }]" use-hero-block>
    <template #accordion>
      <PAccordion :sections="['one', 'two', 'three', 'four']" class="w-[50%] mx-auto p-background rounded-md">
        <template #one-heading>
          This is one using a slot
        </template>
        <template #one-content>
          This is the content for number one
        </template>
        <template #two-content>
          This is the content for number two
        </template>
        <template #content="{ section }">
          This is the default content for section {{ section }}
        </template>
      </PAccordion>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PAccordion from '@/components/Accordion/PAccordion.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>