<template>
  <div class="p-line-numbers">
    <div v-for="i in lines" :key="i" class="p-line-numbers__line-number" />
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    lines: number,
  }>()
</script>

<style>
.p-line-numbers {
  counter-reset: line;

  @apply
  text-right
  relative
  text-subdued
  min-w-max
  overflow-hidden
}

.p-line-numbers__line-number { @apply
  text-right
  w-max
  min-w-max
  ml-auto
}

.p-line-numbers__line-number:before {
  counter-increment: line;
  content: counter(line);
}
</style>