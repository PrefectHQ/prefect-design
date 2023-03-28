<template>
  <li class="p-timeline-item" :class="classes.root">
    <slot>
      <div class="p-timeline-item__left-container" :class="classes.leftContainer">
        <slot name="left" />
      </div>

      <div class="p-timeline-item__center-container" :class="classes.centerContainer">
        <div class="p-timeline-item__point-container">
          <slot name="point">
            <PTimelinePoint />
          </slot>
        </div>
      </div>

      <div class="p-timeline-item__right-container" :class="classes.rightContainer">
        <slot name="right" />
      </div>
    </slot>
  </li>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { TimelineAlignment, TimelineLayout } from '@/types/timeline'

  const props = defineProps<{
    align?: TimelineAlignment,
    layout?: TimelineLayout,
  }>()

  const align = computed(() => props.align ?? 'left')
  const layout = computed(() => props.layout ?? 'default')

  const classes = computed(() => {
    const stacked = layout.value === 'stacked'
    return {
      root: {
        'p-timeline-item--align-left': align.value === 'left',
        'p-timeline-item--align-right': align.value === 'right',
        'p-timeline-item--align-center': align.value === 'center',
        'p-timeline-item--layout-default': layout.value === 'default',
        'p-timeline-item--layout-stacked': stacked,
        'p-timeline-item--layout-alternate': layout.value === 'alternate',
      },
      centerContainer: {
        'p-timeline-item__center-container--layout-stacked': stacked,
        'p-timeline-item__center-container--align-right': stacked && align.value === 'right',
        'p-timeline-item__center-container--align-center': stacked && align.value === 'center',
        'p-timeline-item__center-container--align-left': stacked && align.value === 'left',
      },
      leftContainer: {
        'p-timeline-item__left-container--layout-stacked': stacked,
        'p-timeline-item__left-container--align-right': stacked && align.value === 'right',
        'p-timeline-item__left-container--align-center': stacked && align.value === 'center',
        'p-timeline-item__left-container--align-left': stacked && align.value === 'left',
      },
      rightContainer: {
        'p-timeline-item__right-container--layout-stacked': stacked,
        'p-timeline-item__right-container--align-right': stacked && align.value === 'right',
        'p-timeline-item__right-container--align-center': stacked && align.value === 'center',
        'p-timeline-item__right-container--align-left': stacked && align.value === 'left',
      },
    }
  })
</script>

<style>
.p-timeline-item {
  --p-timeline-item-gap: 1rem;
}

.p-timeline-item { @apply
  flex
  items-start
  relative
  py-[var(--p-timeline-item-gap)]
  box-content
}

.p-timeline-item--layout-stacked { @apply
  py-[var(--p-timeline-item-gap)]
}

.p-timeline-item__right-container,
.p-timeline-item__left-container { @apply
  self-center
  flex-1
  z-[1]
}

.p-timeline-item__left-container { @apply
  text-right
}

.p-timeline-item__right-container { @apply
  text-left
}

.p-timeline-item__center-container { @apply
  flex
  text-center
  self-start
  justify-center
}

.p-timeline-item__center-container::before { @apply
  absolute
  top-0
  left-1/2
  bottom-0
  w-px
  -translate-x-1/2
  bg-foreground-200
  dark:bg-foreground-300
  z-0
  ;

  content: '';
}

.p-timeline-item--layout-alternate:nth-child(odd) { @apply
  flex-row-reverse
}

.p-timeline-item--layout-alternate:nth-child(even) { @apply
  flex-row
}

.p-timeline-item--layout-default { @apply
  flex-row
}

.p-timeline-item--layout-stacked { @apply
  grid
}

.p-timeline-item--align-right,
.p-timeline-item__left-container--align-right,
.p-timeline-item__right-container--align-right,
.p-timeline-item--layout-alternate:nth-child(odd) .p-timeline-item__right-container { @apply
  text-right
  justify-end
}

.p-timeline-item--align-center,
.p-timeline-item__left-container--align-center,
.p-timeline-item__right-container--align-center { @apply
  text-center
  justify-center
}

.p-timeline-item--align-left,
.p-timeline-item__left-container--align-left,
.p-timeline-item__right-container--align-left,
.p-timeline-item--layout-alternate:nth-child(odd) .p-timeline-item__left-container { @apply
  text-left
  justify-start
}

.p-timeline-item__center-container--layout-stacked { @apply
  relative
  h-full
  items-start
}

.p-timeline-item__center-container--align-center { @apply
  h-auto
  static
}

.p-timeline-item__center-container--layout-stacked.p-timeline-item__center-container--align-center { @apply
  mb-[var(--p-timeline-item-gap)]
}

.p-timeline-item__center-container--layout-stacked::before { @apply
  -top-[var(--p-timeline-item-gap)]
  -bottom-[var(--p-timeline-item-gap)]
}

.p-timeline-item__center-container--align-center::before { @apply
  -top-0
  -bottom-0
}

.p-timeline-item__center-container--layout-stacked {
  grid-area: center;
}

.p-timeline-item__left-container--layout-stacked {
  grid-area: left;
}

.p-timeline-item__right-container--layout-stacked {
  grid-area: right;
}

.p-timeline-item__left-container--layout-stacked,
.p-timeline-item__right-container--layout-stacked { @apply
  z-[1]
}

.p-timeline-item--align-left {
  grid-template-areas:
    "center left"
    "center right";
}

.p-timeline-item--align-right {
  grid-template-areas:
    "left center"
    "right center";
}

.p-timeline-item--align-center {
   grid-template-areas:
    "center"
    "left"
    "right";
}

.p-timeline-item__point-container { @apply
  flex
  items-center
  justify-center
}

.p-timeline-item__point-container { @apply
  pt-1
  min-w-[2.5rem]
  mx-[var(--p-timeline-item-gap)]
  z-[1]
}
</style>