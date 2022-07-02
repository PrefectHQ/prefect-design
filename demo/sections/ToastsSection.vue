<template>
  <Section heading="Toasts">
    <div class="flex gap-3">
      <p-button @click="addToast">
        Toast
      </p-button>
      <p-button @click="addSuccessToast">
        Success Toast
      </p-button>
      <p-button @click="addErrorToast">
        Error Toast
      </p-button>
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/Section.vue'
  import { showToast } from '@/plugins/Toast'

  const addToast = (): void => {
    showToast('This is default message', 'default', { dismissible:false })
  }
  const addSuccessToast = (): void => {
    showToast('This is success!', 'success', { autoDismiss: false })
  }
  const addErrorToast = (): void => {
    showToast('Something went wrong..', 'error')
  }
</script>