<template>
  <ComponentPage title="Window" :demos="[{ title: 'Window' }]">
    <template #window>
      <p-window title="title.prop-or-slot.py">
        <template #actions>
          <p-button small>
            Actions slot
          </p-button>
        </template>
        <p-code-highlight text="const works = true" lang="js" />
      </p-window>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>