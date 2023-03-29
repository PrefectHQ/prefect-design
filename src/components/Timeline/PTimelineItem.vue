<template>
  <li class="p-timeline-item" :class="classes.root">
    <div v-if="slots.date" class="p-timeline-item__date" :class="classes.date">
      <slot name="date" />
    </div>

    <div class="p-timeline-item__center" :class="classes.center">
      <div class="p-timeline-item__point">
        <slot name="point">
          <PTimelinePoint />
        </slot>
      </div>
    </div>

    <div v-if="slots.content" class="p-timeline-item__content" :class="classes.content">
      <slot name="content" />
    </div>
  </li>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { TimelineAlignment } from '@/types/timeline'

  const slots = useSlots()

  const props = defineProps<{
    align?: TimelineAlignment,
    stacked?: boolean,
  }>()

  const align = computed(() => props.align)

  const classes = computed(() => {
    return {
      root: {
        [`p-timeline-item--align-${align.value}`]: !!align.value,
        'p-timeline-item--stacked': props.stacked,
      },
      center: {
        [`p-timeline-item__center--align-${align.value}`]: !!align.value,
        'p-timeline-item__center--stacked': props.stacked,
      },
      date: {
        [`p-timeline-item__date--align-${align.value}`]: !!align.value,
        'p-timeline-item__date--stacked': props.stacked,
      },
      content: {
        [`p-timeline-item__content--align-${align.value}`]: !!align.value,
        'p-timeline-item__content--stacked': props.stacked,
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

.p-timeline-item--stacked { @apply
  grid
  py-[var(--p-timeline-item-gap)]
}

.p-timeline-item__content,
.p-timeline-item__date { @apply
  flex-1
  z-[1]
}

.p-timeline-item__date { @apply
  text-right
}

.p-timeline-item__content { @apply
  text-left
}

.p-timeline-item__center { @apply
  flex
  text-center
  self-start
  justify-center
}

.p-timeline-item__center::before { @apply
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

.p-timeline-item--align-right,
.p-timeline-item__date--align-right,
.p-timeline-item__content--align-right { @apply
  text-right
  justify-end
}

.p-timeline-item--align-center,
.p-timeline-item__date--align-center,
.p-timeline-item__content--align-center { @apply
  text-center
  justify-center
}

.p-timeline-item--align-left,
.p-timeline-item__date--align-left,
.p-timeline-item__content--align-left { @apply
  text-left
  justify-start
}

.p-timeline-item__center--stacked { @apply
  relative
  h-full
  items-start
}

.p-timeline-item__center--align-center { @apply
  h-auto
  static
}

.p-timeline-item__center--stacked.p-timeline-item__center--align-center { @apply
  mb-[var(--p-timeline-item-gap)]
}

.p-timeline-item__center--stacked::before { @apply
  -top-[var(--p-timeline-item-gap)]
  -bottom-[var(--p-timeline-item-gap)]
}

.p-timeline-item__center--align-center::before { @apply
  -top-0
  -bottom-0
}

.p-timeline-item__center--stacked {
  grid-area: center;
}

.p-timeline-item__date--stacked {
  grid-area: date;
}

.p-timeline-item__content--stacked {
  grid-area: content;
}

.p-timeline-item__date--stacked,
.p-timeline-item__content--stacked { @apply
  z-[1]
}

.p-timeline-item--align-left {
  grid-template-areas:
    "center date"
    "center content";
}

.p-timeline-item--align-right {
  grid-template-areas:
    "date center"
    "content center";
}

.p-timeline-item--align-center {
   grid-template-areas:
    "center"
    "date"
    "content";
}

.p-timeline-item__point { @apply
  flex
  items-center
  justify-center
}

.p-timeline-item__point { @apply
  pt-1
  min-w-[2.5rem]
  mx-[var(--p-timeline-item-gap)]
  z-[1]
}
</style>