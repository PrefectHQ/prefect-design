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
.p-ordered-list { @apply
  p-6
}

.p-ordered-list__list { @apply
  list-none
  p-0
  m-0
}

.p-ordered-list__item { @apply
  flex
  items-center
  mb-8
  relative
}

.p-ordered-list__left { @apply
  flex-shrink-0
  mr-8
}

.p-ordered-list__node { @apply
  absolute
  top-5
  left-1/2
  w-2.5
  h-2.5
  rounded-full
  bg-primary
  transform -translate-x-1/2
}

.p-ordered-list__right { @apply
  flex-1
}

.p-ordered-list { @apply
  p-6
}
</style>