<template>
  <div class="p-navigation-bar" :class="classes.root">
    <template v-if="$slots.leading">
      <div class="p-navigation-bar__leading">
        <slot name="leading" />
      </div>
    </template>
    <div class="p-navigation-bar__content" :class="classes.content">
      <slot />
    </div>
    <template v-if="$slots.trailing">
      <div class="p-navigation-bar__trailing">
        <slot name="trailing" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    horizontal?: boolean,
  }>()

  const classes = computed(() => ({
    root: {
      'p-navigation-bar--horizontal': props.horizontal,
    },
    content: {
      'p-navigation-bar__content--horizontal': props.horizontal,
    },
  }))
</script>

<style>
.p-navigation-bar { @apply
  grid
  overflow-hidden
  h-full
  w-64
}

.p-navigation-bar--horizontal { @apply
  h-16
  w-full
}

.p-navigation-bar {
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
}

.p-navigation-bar--horizontal {
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
}

.p-navigation-bar__content { @apply
  self-stretch
}

.p-navigation-bar__content--horizontal { @apply
  flex
}
</style>