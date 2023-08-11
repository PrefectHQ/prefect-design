<template>
  <ComponentPage
    title="Code"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
    ]"
  >
    <template #inline>
      This <p-code inline>
        is
      </p-code> an <p-code inline>
        inline
      </p-code> code block.
    </template>

    <template #multiline>
      <p-code>
        {{ multilineContent }}
      </p-code>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCode } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const multilineContent = `import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')`
</script>

<style>
.code-row {
  @apply flex w-full;
}

.code-row__leading {
  @apply select-none
  w-[75px]
}

.code-row__content {
  @apply flex-grow select-auto whitespace-pre-wrap;
}
</style>