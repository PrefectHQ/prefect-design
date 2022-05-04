<template>
  <div class="resizable-container">
    <p-tag-wrapper :tags="numberArr" />

    <p-tag-wrapper :tags="numberArr">
      <template #tag="{ tag }">
        <p-tag icon="Prefect">
          {{ tag }}
        </p-tag>
      </template>
    </p-tag-wrapper>

    <p-tag-wrapper>
      <p-tag v-for="i in 20" :key="i" class="resizable-container__tag">
        Tag {{ i }}
      </p-tag>
    </p-tag-wrapper>
  </div>
</template>

<script lang="ts" setup>
  const numberArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
</script>

<style>
.resizable-container {
  min-width: 75px;
  max-width: 50%;
  resize: horizontal;
  overflow: hidden;
}

.resizable-container__tag {
  display: inline-block;
}
</style>