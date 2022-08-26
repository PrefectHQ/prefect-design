<template>
  <Section heading="Empty State">
    <p-empty-state>
      <template #icon>
        <p-icon icon="ViewGridIcon" />
        <p-icon icon="DotsHorizontalIcon" />
        <p-icon icon="UserIcon" />
      </template>

      <template #heading>
        Create a workspace to get started
      </template>

      <template #description>
        Workspaces allow teams to organize flows into custom dashboards and
        easily share them with others.
      </template>

      <template #actions>
        <p-button>
          Create Workspace
          <p-icon icon="PlusIcon" class="ml-1 w-4 h-4" />
        </p-button>
      </template>
    </p-empty-state>
  </Section>
</template>


  <script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@/components'
  import Section from './Section.vue'
</script>


