<template>
  <li class="p-timeline-item">
    <slot>
      <div class="p-timeline-item__left-container">
        <slot name="left" />
      </div>

      <div class="p-timeline-item__center-container">
        <div class="p-timeline-item__point-container">
          <slot name="node">
            <PTimelinePoint />
          </slot>
        </div>
      </div>

      <div class="p-timeline-item__right-container">
        <slot name="right" />
      </div>
    </slot>
  </li>
</template>

<style>
.p-timeline-item { @apply
  flex
  items-start
  relative
  justify-center
  py-4
  box-content
}


.p-timeline-item__right-container,
.p-timeline-item__left-container { @apply
  self-center
  flex-1
}

.p-timeline-item__left-container { @apply
  text-right
}

.p-timeline-item__right-container { @apply
  text-left
}


.p-timeline-item__center-container,
.p-timeline-item__point-container { @apply
  self-stretch
  shrink
  grow-0
  flex
  flex-row
  items-center
  justify-center
}

.p-timeline-item__point-container { @apply
  pt-1
  min-w-[2.5rem]
  mx-4
  z-[1]
}

.p-timeline-item__center-container::before { @apply
  absolute
  top-0
  left-1/2
  bottom-0
  w-px
  h-full
  -translate-x-1/2
  bg-foreground-200
  dark:bg-foreground-300
  z-0
  ;

  content: '';
}
</style>