<template>
  <ComponentPage title="Accordion" :demos="[{ title: 'Accordion' }, { title: 'Controlled Accordion' }]">
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
    <template #controlled-accordion>
      <p-number-input v-model="number" />
      <PAccordion :sections="['0', '1', '2', '3']" :model-value="(number % 4).toString()" @update:model-value="number = parseInt($event)">
        <template #1-heading>
          This is one using a slot
        </template>
        <template #2-content>
          This is the content for number one
        </template>
        <template #3-content>
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
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'


  const number = ref(0)
</script>