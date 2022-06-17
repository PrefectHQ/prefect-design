<template>
  <component :is="element" v-bind="elementProps" :class="classes" class="p-card-button">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouterLink, RouteLocationRaw } from 'vue-router'

  const props = defineProps<{
    flat?: boolean,
    to?: RouteLocationRaw,
  }>()

  const element = computed(() => props.to ? RouterLink : 'button')
  const elementProps = computed(() => {
    if (props.to) {
      return { to: props.to }
    }

    return {}
  })

  const classes = computed(() => ({
    'p-card-button--flat': props.flat,
  }))
</script>

<style>
.p-card-button { @apply
  block
  w-full
  text-left
  bg-white
  border
  border-gray-300
  p-6
  rounded-lg
  shadow-sm
}

.p-card-button:hover { @apply
  shadow-lg
  border-primary
}

.p-card-button--flat:hover { @apply
  shadow-sm
}
</style>