<template>
  <p-icon-text v-for="icon in icons" :key="icon" :icon="icon" class="mt-2">
    <span>{{ icon }}</span>
  </p-icon-text>
</template>

<script lang="ts" setup>
  const icons = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>
