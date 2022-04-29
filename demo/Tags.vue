<template>
  <div>
    <p-tag-wrapper :tags="numbers">
      <p-tag>one</p-tag>
      <p-tag>two</p-tag>
      <p-tag>three</p-tag>
    </p-tag-wrapper>
  </div>

  <div class="mt-4">
    <p-tag-wrapper :tags="words" />
  </div>

  <div class="mt-4">
    <p-tag-wrapper :tags="[]" />
  </div>
</template>

<script lang="ts" setup>
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six']
  const words = ['db', 'etl', 'dev', 'marketing', 'sales', 'engineering', 'k8s', 'eks']
</script>

