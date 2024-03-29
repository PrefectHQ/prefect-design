<template>
  <div>
    level 1

    {{ value }}

    <p-button small @click="openPanelById('level-2')">
      Open sub
    </p-button>

    <p-button small @click="close">
      Close
    </p-button>
  </div>
</template>

<script setup lang="ts">
  import { useCascadePanel, useCascadePanels } from '@/compositions'

  const { value, close } = useCascadePanel()
  const { openPanelById } = useCascadePanels()
</script>