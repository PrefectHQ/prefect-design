<template>
  <li class="p-timeline-item" :class="classes.root">
    <div v-if="slots.date" class="p-timeline-item__date" :class="classes.date">
      <slot name="date" />
    </div>

    <div class="p-timeline-item__point" :class="classes.point">
      <slot name="point">
        <PTimelinePoint />
      </slot>
    </div>

    <div v-if="slots.content" class="p-timeline-item__content" :class="classes.content">
      <slot name="content" />
    </div>
  </li>
</template>

<script lang="ts" setup>
  import { computed, toRefs, useSlots } from 'vue'
  import { TimelineLayout } from '@/types/timeline'

  const slots = useSlots()

  const props = defineProps<{
    layout: TimelineLayout,
  }>()

  const { layout } = toRefs(props)

  const classes = computed(() => {
    return {
      root: `p-timeline-item--${layout.value}`,
      point: `p-timeline-item__point--${layout.value}`,
      date: `p-timeline-item__date--${layout.value}`,
      content: `p-timeline-item__content--${layout.value}`,
    }
  })
</script>

<style>
.p-timeline-item {
  --gap: var(--p-timeline-item-gap, 1rem);
  --point-width: var(--p-timeline-item-point-width, 2.5rem);
  --content-width: var(--p-timeline-item-content-width, 1fr);
  --date-width: var(--p-timeline-item-date-width, 1fr);
}

.p-timeline-item { @apply
  grid
  items-start
  relative
  py-[var(--gap)]
  box-content
}

.p-timeline-item--date-left,
.p-timeline-item--date-right { @apply
  gap-[var(--gap)]
}

.p-timeline-item--stacked-left,
.p-timeline-item--stacked-center,
.p-timeline-item--stacked-right { @apply
  gap-x-[var(--gap)]
}

.p-timeline-item--date-left {
  grid-template-columns: var(--date-width) var(--point-width) var(--content-width);
  grid-template-areas: 'date point content';
}

.p-timeline-item--date-right {
  grid-template-columns: var(--content-width) var(--point-width) var(--date-width);
  grid-template-areas: 'content point date';
}

.p-timeline-item--stacked-left {
  grid-template-columns: var(--point-width) 1fr;
  grid-template-areas: 'point date'
                       'point content';
}

.p-timeline-item--stacked-center { @apply
  text-center
  justify-center;

  grid-template-areas: 'point'
                       'date'
                       'content';
}

.p-timeline-item--stacked-right {
  grid-template-columns: 1fr var(--point-width);
  grid-template-areas: 'date point'
                       'content point';
}

.p-timeline-item__content,
.p-timeline-item__date { @apply
  min-w-0
}

.p-timeline-item__date:empty { @apply
  hidden
}

.p-timeline-item__date {
  grid-area: date;
}

.p-timeline-item__point {
  grid-area: point;
}

.p-timeline-item__content {
  grid-area: content;
}

.p-timeline-item__point { @apply
  flex
  items-start
  justify-center
  relative
  z-[1]
  h-full
  w-full
}

.p-timeline-item__point--stacked-center { @apply
  static
  mb-[var(--gap)]
}

.p-timeline-item__point::before { @apply
  absolute
  -top-[var(--gap)]
  left-1/2
  -bottom-[var(--gap)]
  w-px
  -translate-x-1/2
  bg-divider
  -z-[1];

  content: '';
}

.p-timeline-item__point--stacked-center::before { @apply
  top-0
  bottom-0
}

.p-timeline-item__date--date-left { @apply
  text-right
}

.p-timeline-item__date--date-right { @apply
  text-left
}

.p-timeline-item__content--date-left { @apply
  text-left
}

.p-timeline-item__content--date-right { @apply
  text-right
}

.p-timeline-item__date--stacked-left,
.p-timeline-item__date--stacked-center,
.p-timeline-item__date--stacked-right { @apply
  mb-[var(--gap)]
}

.p-timeline-item__date--stacked-left,
.p-timeline-item__content--stacked-left { @apply
  text-left
}

.p-timeline-item__date--stacked-center,
.p-timeline-item__content--stacked-center { @apply
  text-center
}

.p-timeline-item__date--stacked-right,
.p-timeline-item__content--stacked-right { @apply
  text-right
}
</style>