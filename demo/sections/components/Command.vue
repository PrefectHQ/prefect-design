<template>
  <ComponentPage title="Command" :demos="[{ title: 'Dialog' }]">
    <template #dialog>
      <p-command>
        <p-command-group heading="Group 1">
          <p-command-item value="Item 1" @select="handleSelect">
            Item 1
          </p-command-item>
          <p-command-item value="Item 2" @select="handleSelect">
            Item 2
          </p-command-item>
        </p-command-group>
        <p-command-separator />
        <p-command-group heading="Group 2">
          <p-command-item value="Item 3" @select="handleSelect">
            Item 3
          </p-command-item>
          <p-command-item value="Item 4" @select="handleSelect">
            Item 4
          </p-command-item>
          <p-command-item value="Item 5" @select="handleSelect">
            Item 5
          </p-command-item>
        </p-command-group>
      </p-command>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const handleSelect = (event: Event) => {
    alert(`Selected: ${(event.target as HTMLElement).textContent}`)
  }
</script>