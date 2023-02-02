<template>
  <code v-if="inline" class="p-code-container"><slot /></code>
  <pre v-else class="p-code-container p-code-container--block"><code><slot /></code></pre>
</template>

<script lang="ts">
  export default {
    name: 'PCode',
    expose: [],
  }
</script>

<script lang="ts" setup>
  defineProps<{
    /**
     * Unwraps the semantic
     * \<pre\> tags and removes block-level styling
     */
    inline?: boolean,
  }>()
</script>

<style>
.p-code-container { @apply
  bg-slate-700
  text-slate-50
  rounded
  px-1
  py-1
}

.p-code-container--block { @apply
  px-2
  py-2
  overflow-x-auto
}
</style>