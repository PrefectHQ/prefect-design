<template>
  <slot v-if="!error" />
  <slot v-else name="fallback" />
</template>

<script lang="ts" setup>
  import { onErrorCaptured, ref } from 'vue'

  const error = ref<string | null>(null)

  onErrorCaptured((err) => {
    error.value = err.message
    return false
  })
</script>