<template>
  <component :is="element" class="p-heading" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    heading?: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6',
    element?: string,
  }>()

  const heading = computed(() => props.heading ?? 1)
  const element = computed(() => props.element ?? `h${heading.value}`)
  const classes = computed(() => `p-heading--${heading.value}`)
</script>

<style>
.p-heading { @apply
  font-semibold
}

.p-heading--1 { @apply
  text-4xl
}

.p-heading--2 { @apply
  text-3xl
}

.p-heading--3 { @apply
  text-2xl
}

.p-heading--4 { @apply
  text-xl
}

.p-heading--5 { @apply
  text-lg
}

.p-heading--6 { @apply
  text-base
}
</style>