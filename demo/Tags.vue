<template>
  <div>
    <p-tags :tags="numbers" />
  </div>

  <div class="mt-4">
    <p-tags :tags="words" />
  </div>

  <div class="mt-4">
    <p-tags :tags="[]" />
  </div>
</template>

<script lang="ts" setup>
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six']
  const words = ['db', 'etl', 'dev', 'marketing', 'sales', 'engineering', 'k8s', 'eks']
</script>

