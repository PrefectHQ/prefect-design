<template>
  <div class="p-navigation-bar" :class="classes.root">
    <template v-if="slots.prepend">
      <div class="p-navigation-bar__prepend" :class="classes.prepend">
        <slot name="prepend" />
      </div>
    </template>

    <div class="p-navigation-bar__content" :class="classes.content">
      <slot />
    </div>

    <template v-if="slots.append">
      <div class="p-navigation-bar__append" :class="classes.append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { NavigationBarLayout } from '@/types/navigationBar'

  const props = defineProps<{
    layout?: NavigationBarLayout,
  }>()

  const slots = useSlots()

  const layout = computed(() => props.layout ?? 'vertical')

  const classes = computed(() => ({
    root: {
      [`p-navigation-bar--${layout.value}`]: true,
    },
    prepend: {
      [`p-navigation-bar__prepend--${layout.value}`]: true,
    },
    append: {
      [`p-navigation-bar__append--${layout.value}`]: true,
    },
    content: {
      [`p-navigation-bar__content--${layout.value}`]: true,
    },
  }))
</script>

<style>
.p-navigation-bar {
  --prepend-gap: var(--p-navigation-bar-prepend-gap, theme(gap.4));
  --append-gap: var(--p-navigation-bar-append-gap, theme(gap.4));
  --content-gap: var(--p-navigation-bar-content-gap, theme(gap.4));
}

.p-navigation-bar { @apply
  grid
  gap-4
  overflow-hidden
  bg-primary-100
  dark:bg-background-500
  h-screen
  w-64
  rounded-r-2xl
  shadow
}

.p-navigation-bar--horizontal { @apply
  h-16
  w-full
  rounded-none
  rounded-b-lg
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
  overflow-auto
}

.p-navigation-bar__content--horizontal { @apply
  flex
}

.p-navigation-bar__prepend,
.p-navigation-bar__append { @apply
  flex
  flex-col
  items-center
}

.p-navigation-bar__prepend { @apply
  gap-[var(--prepend-gap)]
}

.p-navigation-bar__append { @apply
  gap-[var(--append-gap)]
}

.p-navigation-bar__prepend--horizontal,
.p-navigation-bar__append--horizontal { @apply
  flex-row
  justify-center
}
</style>