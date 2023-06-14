<template>
  <ComponentPage title="Accordion" :demos="[{ title: 'Accordion' }]">
    <template #accordion>
      <PAccordion :sections="['one', 'two', 'three', 'four']">
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