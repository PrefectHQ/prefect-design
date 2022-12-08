<template>
  <pre v-if="multiline" class="p-code-container p-code-container--block"><code><slot /></code></pre>
  <code v-else class="p-code-container">
    <slot />
  </code>
</template>

<script lang="ts">
  export default {
    name: 'PCode',
    expose: [],
  }
</script>

<script lang="ts" setup>
  import { showToast } from '@/plugins'

  const props = defineProps<{
    /**
     * Optionally wraps the component in semantic
     * \<pre\> tags and applies additional block-level styling
     */
    multiline?: boolean,
  }>()
</script>

<style>
.p-code-container {
  @apply
  bg-slate-700
  text-slate-50
  rounded
  px-1
  py-1
  relative
}
.p-code-container--block {
  @apply
  px-2
  py-2
  overflow-x-auto
}

.copy-button {
  @apply
  bg-white
  bg-opacity-50
  absolute
  top-3
  right-3
  my-auto
  z-10
}
</style>