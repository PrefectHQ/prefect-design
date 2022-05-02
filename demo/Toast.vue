<template>
  <!--
    <p-toast>
    <template #header>
    Successfully saved!
    </template>
    <template #message>
    Some random words
    </template>
    </p-toast>
  -->
  <p-button @click="addToast">
    Add toast
  </p-button>
</template>

<script lang="ts" setup>
  import  PToast from '@/components/Toast/PToast.vue'
  import { showToast } from '@/plugins/Toast'

  const addToast = () => {
    console.log('copy')
    showToast('This is my toast', 'success')
  }
</script>

<style>
</style>