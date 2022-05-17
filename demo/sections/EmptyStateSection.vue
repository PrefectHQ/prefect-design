<template>
  <Section heading="Empty States">
    <p-empty-state>
      <template #icon>
        <p-icon icon="ViewGridIcon" class="w-14 h-14" />
        <p-icon icon="DotsHorizontalIcon" class="w-14 h-14" />
        <p-icon icon="UserIcon" class="w-14 h-14" />
      </template>

      <template #heading>
        Create a workspace to get started
      </template>

      <template #description>
        Workspaces allow teams to organize flows into custom dashboards and
        easily share them with others.
      </template>

      <template #action>
        <p-button>Create Workspace <p-icon icon="PlusIcon" class="ml-1 w-4 h-4" /></p-button>
      </template>
    </p-empty-state>
  </Section>
</template>


  <script lang="ts" setup>
  import Section from '../components/Section.vue'
  import { PEmptyState } from '@/components'
  </script>


