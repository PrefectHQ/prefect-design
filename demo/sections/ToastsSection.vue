<template>
  <Section heading="Toasts">
    <div class="flex gap-3">
      <p-button @click="defaultToast">
        Toast
      </p-button>
      <p-button @click="successToast">
        Success Toast
      </p-button>
      <p-button @click="errorToast">
        Error Toast
      </p-button>
      <p-button @click="noTimeoutToast">
        Doesn't automatically dismiss Toast
      </p-button>
      <p-button @click="componentToast">
        Uses component message
      </p-button>
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/Section.vue'
  import ToastMessage from '../components/ToastMessage.vue'
  import { showToast } from '@/plugins/Toast'

  const defaultToast = (): void => {
    showToast('This is default message', 'default')
  }
  const successToast = (): void => {
    showToast('This is success!', 'success')
  }
  const errorToast = (): void => {
    showToast('Something went wrong..', 'error')
  }
  const noTimeoutToast = (): void => {
    showToast('Waiting for you to dismiss', 'default', { timeout:false })
  }
  const componentToast = (): void => {
    showToast(ToastMessage)
  }
</script>