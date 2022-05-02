<template>
  <div class="flex gap-3">
    <p-button @click="addSuccessToast">
      Success Toast
    </p-button>
    <p-button @click="addErrorToast">
      Error Toast
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { showToast } from '@/plugins/Toast'

  const addSuccessToast = (): void => {
    showToast('This is success!', 'success')
  }
  const addErrorToast = (): void => {
    showToast('Something went wrong', 'error')
  }
</script>

<style>
</style>