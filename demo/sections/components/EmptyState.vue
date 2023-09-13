<template>
  <ComponentPage title="Empty State" :demos="[{ title: 'Empty State' }]">
    <template #empty-state>
      <p-empty-state>
        <template #icon>
          <p-icon icon="Squares2X2Icon" />
          <p-icon icon="EllipsisHorizontalIcon" />
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
          <p-button icon="PlusIcon">
            Create Workspace
          </p-button>
        </template>
      </p-empty-state>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>