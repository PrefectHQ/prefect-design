<template>
  <div ref="stickyControls" class="list-header" :class="classes.header">
    <div class="list-header__left">
      <slot />
    </div>

    <template v-if="slots.controls">
      <div class="list-header__controls">
        <slot name="controls" />
      </div>
    </template>

    <template v-if="slots.sort">
      <div class="list-header__sort">
        <slot name="sort" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { UsePositionStickyObserverOptions, usePositionStickyObserver } from '@prefecthq/vue-compositions'
  import { computed, ref, useSlots } from 'vue'

  const props = defineProps<{
    sticky?: boolean,
    stickyOptions?: UsePositionStickyObserverOptions,
  }>()

  const slots = useSlots()

  const stickyControls = ref<HTMLElement>()
  const { stuck } = usePositionStickyObserver(stickyControls, props.stickyOptions)

  const classes = computed(() => ({
    header: {
      'list-header--sticky': props.sticky,
      'list-header--stuck': props.sticky && stuck.value,
    },
  }))
</script>

<style>
.list-header { @apply
  grid
  justify-between
  items-center
  gap-2
  transition-all;
  grid-template-areas:
    "controls controls"
    "left sort";
}

.list-header__left {
  grid-area: left;
}

.list-header__controls { @apply
  flex
  flex-col
  md:flex-row
  items-center
  gap-2;
  grid-area: controls;
}

.list-header__sort { @apply
  md:border-l
  md:border-l-divider
  md:pl-2;
  grid-area: sort;
}

@screen md {
  .list-header {
    grid-template-areas: "left controls sort";
    grid-template-columns: 1fr auto auto;
  }

  .list-header--sticky { @apply
    sticky
    rounded-b-default
    top-0
    z-10
  }

  .list-header--stuck { @apply
    bg-floating-sticky
    backdrop-blur-sm
    shadow-md
    p-2
  }
}
</style>