<template>
  <Section heading="Tabs">
    <p-tab-wrapper v-model="selectedTab" :tabs="tabs">
      <template #tab-heading-0="{ tab }">
        <p-icon icon="Prefect" class="w-4 h-4 mr-2" />
        <span>{{ tab }}</span>
      </template>
    </p-tab-wrapper>


    Selected tab index: {{ selectedTab }}
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'
  import { PTabWrapper } from '@/components'

  const tabs = ['Tab One', 'Tab Two', 'Tab Three']
  const selectedTab = ref()
</script>
