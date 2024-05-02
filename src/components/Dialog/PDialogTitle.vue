<template>
  <DialogTitle
    v-bind="props"
    class="p-dialog-title"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
  import { DialogTitle, type DialogTitleProps } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DialogTitleProps>()
</script>


<style>
.p-dialog-title {
  @apply text-lg font-semibold leading-none tracking-tight;
}
</style>