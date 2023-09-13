<template>
  <slot v-if="!error" />
  <slot v-else name="fallback" v-bind="{ error }" />
</template>

<script lang="ts" setup>
  import { onErrorCaptured, ref } from 'vue'

  const emit = defineEmits<{
    (event: 'error', value: Error): void,
  }>()

  const error = ref<Error>(null)

  onErrorCaptured((err) => {
    error.value = err
    emit('error', error.value)
    return false
  })
</script>