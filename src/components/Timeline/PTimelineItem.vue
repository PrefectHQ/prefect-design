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
  import { TimelineAlignment, TimelineItemLayout } from '@/types/timeline'

  const slots = useSlots()

  const props = defineProps<{
    layout: TimelineItemLayout,
    align: TimelineAlignment,
  }>()

  const { layout, align } = toRefs(props)

  const classes = computed(() => {
    return {
      root: [`p-timeline-item--${layout.value}`, `p-timeline-item--${layout.value}-${align.value}`],
      point: [`p-timeline-item__point--${layout.value}`, `p-timeline-item__point--${layout.value}-${align.value}`],
      date: [`p-timeline-item__date--${layout.value}`, `p-timeline-item__date--${layout.value}-${align.value}`],
      content: [`p-timeline-item__content--${layout.value}`, `p-timeline-item__content--${layout.value}-${align.value}`],
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

.p-timeline-item--default { @apply
  gap-[var(--gap)]
}

.p-timeline-item--stacked { @apply
  gap-x-[var(--gap)]
}

.p-timeline-item--default-left,
.p-timeline-item--default-center {
  grid-template-columns: var(--date-width) var(--point-width) var(--content-width);
  grid-template-areas: 'date point content';
}

.p-timeline-item--default-right {
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
  bg-foreground-200
  dark:bg-foreground-300
  -z-[1];

  content: '';
}

.p-timeline-item__point--stacked-center::before { @apply
  top-0
  bottom-0
}

.p-timeline-item__date--default-left,
.p-timeline-item__date--default-center { @apply
  text-right
}

.p-timeline-item__date--default-right { @apply
  text-left
}

.p-timeline-item__content--default-left,
.p-timeline-item__content--default-center { @apply
  text-left
}

.p-timeline-item__content--default-right { @apply
  text-right
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