<template>
  <div>
    <p-icon :icon="icon" class="w-10 h-10" />
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    href: string,
    title: string,
    icon: string,
    isActive: boolean,
  }>()
</script>

<style scoped>

</style>