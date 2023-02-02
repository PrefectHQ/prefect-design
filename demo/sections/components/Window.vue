<template>
  <ComponentPage title="Window" :demos="[{ title: 'Window' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-window
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #window>
      <p-window title="title.prop-or-slot.py">
        <template #actions>
          <p-button inset size="xs">
            Actions slot
          </p-button>
        </template>
        window slot!
      </p-window>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>