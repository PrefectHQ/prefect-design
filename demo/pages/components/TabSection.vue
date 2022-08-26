<template>
  <Section heading="Tabs">
    <p-tabs :tabs="tabs">
      <template #tab-one-heading="{ tab }">
        <p-icon icon="Prefect" class="w-4 h-4 mr-2" />
        <span>{{ tab }}</span>
      </template>

      <template #tab-one>
        <div>
          Content One
        </div>
      </template>

      <template #tab-two>
        <div>
          Content Two
        </div>
      </template>

      <template #tab-three>
        <div>
          Content Three
        </div>
      </template>
    </p-tabs>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/Section.vue'
  import { PTabs } from '@/components'

  const tabs = ['Tab One', 'Tab Two', 'Tab Three']
</script>
