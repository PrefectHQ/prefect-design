<template>
  <div class="p-navigation-bar" :class="classes.root">
    <template v-if="$slots.leading">
      <div class="p-navigation-bar__leading" :class="classes.leading">
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
    leading: {
      'p-navigation-bar__leading--horizontal': props.horizontal,
    },
    content: {
      'p-navigation-bar__content--horizontal': props.horizontal,
    },
  }))
</script>

<style>
.p-navigation-bar {
  --leading-gap: var(--p-navigation-bar--leading-gap, theme(gap.4));
  --trailing-gap: var(--p-navigation-bar--trailing-gap, theme(gap.4));
  --content-gap: var(--p-navigation-bar--content-gap, theme(gap.4));
}

.p-navigation-bar { @apply
  grid
  gap-4
  overflow-hidden
  bg-primary-100
  dark:bg-background-50
  h-screen
  w-64
  rounded-r-2xl
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

.p-navigation-bar__leading,
.p-navigation-bar__trailing { @apply
  flex
  flex-col
  items-center
}

.p-navigation-bar__leading { @apply
  gap-[var(--leading-gap)]
}

.p-navigation-bar__trailing { @apply
  gap-[var(--trailing-gap)]
}

.p-navigation-bar__leading--horizontal,
.p-navigation-bar__trailing--horizontal { @apply
  flex-row
  justify-center
}
</style>