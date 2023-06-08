<template>
  <ComponentPage title="Accordion" :demos="[{ title: 'Accordion' }]">
    <template #accordion>
      <PAccordion :sections="['one', 'two']">
        <template #one-heading>
          test
        </template>
        <template #one-content>
          test
        </template>
        <template #two-content>
          test two!
        </template>
      </PAccordion>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PAccordion from '@/components/Accordion/PAccordion.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>