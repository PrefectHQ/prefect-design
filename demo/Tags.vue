<template>
  <div class="resizable-container">
    <p-tag-wrapper>
      <p-tag v-for="i in 20" :key="i" style="display: inline-block;">
        {{ i }} tag
      </p-tag>
    </p-tag-wrapper>
  </div>

  <!--
    <div class="mt-4">
    <p-tag-wrapper :tags="words" />
    </div>

    <div class="mt-4">
    <p-tag-wrapper :tags="[]" />
    </div>
  -->
</template>

<script lang="ts" setup>
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six']
  const words = ['db', 'etl', 'dev', 'marketing', 'sales', 'engineering', 'k8s', 'eks']
</script>

<style>
.resizable-container {
  resize: horizontal;
  min-width: 75px;
  max-width: 100%;
  overflow:hidden;
}
</style>