<template>
  <div class="p-ordered-list">
    <ol class="p-ordered-list__list">
      <li v-for="(item, index) in items" :key="index" class="p-ordered-list__item">
        <div class="p-ordered-list__left">
          <slot name="left" :item="item" />
        </div>
        <div class="p-ordered-list__node" />
        <div class="p-ordered-list__right">
          <slot name="right" :item="item" />
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PCode',
    expose: [],
  }
</script>

<script lang="ts" setup>
  defineProps<{
    items: unknown[],
  }>()
</script>

<style scoped>
.p-ordered-list {
  @apply p-6;
}

.p-ordered-list__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.p-ordered-list__item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
}

.p-ordered-list__left {
  flex: 0 0 auto;
  margin-right: 2rem;
}

.p-ordered-list__node {
  position: absolute;
  top: 1.25rem;
  left: calc(50% - 0.25rem);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.p-ordered-list__right {
  flex: 1 1 auto;
}
</style>