<template>
  <ComponentPage title="Accordion" :demos="[{ title: 'Accordion' }, { title: 'Controlled Accordion' }]">
    <template #accordion>
      <PAccordion :sections="['one', 'two', 'three', 'four']">
        <template #content="{ section }">
          This is the default content for section {{ section }}
        </template>
      </PAccordion>
    </template>
    <template #controlled-accordion>
      <p-number-input v-model="number" />
      <PAccordion :sections="['0', '1', '2', '3']" :model-value="(number % 4).toString()" @update:model-value="handleUpdate">
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

  const handleUpdate = (value: string | string[] | undefined | null): void => {
    if (typeof value === 'string') {
      number.value = parseInt(value)
    } else if (Array.isArray(value)) {
      number.value = parseInt(value[0] || '0')
    } else {
      number.value = 0
    }
  }
</script>