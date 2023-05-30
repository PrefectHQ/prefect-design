<template>
  <section ref="container" class="p-layout-resizable" :class="classes.root">
    <aside v-if="slots.aside" ref="aside" class="p-layout-resizable__aside" :class="classes.aside">
      <slot name="aside" v-bind="{ collapsed, expand, collapse, toggle, size: asideSize }" />
    </aside>

    <div
      v-if="slots.default && slots.aside"
      class="p-layout-resizable__handle"
      :class="classes.handle"
      @mousedown="start"
      @mouseup="handleAsideClick"
    />

    <main v-if="slots.default" class="p-layout-resizable__main" :class="classes.main">
      <slot v-bind="{ collapsed, expand, collapse, toggle, asideSize }" />
    </main>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, useSlots, watch } from 'vue'
  import { LayoutResizablePlacement, isHorizontalPlacement } from '@/types/layoutResizable'


  const props = defineProps<{
    collapsePoint?: number,
    disabled?: boolean,
    placement?: LayoutResizablePlacement,
  }>()


  const slots = useSlots()

  const container = ref<HTMLDivElement>()
  const aside = ref<HTMLDivElement>()

  const dragging = ref(false)
  const collapsed = ref(false)
  const asideSize = ref<number | undefined>(undefined)

  const placement = computed(() => props.placement ?? 'left')

  const horizontal = computed(() => isHorizontalPlacement(placement.value))

  const classes = computed(() => {
    const resizable = !props.disabled

    return {
      root: {
        [`p-layout-resizable--${placement.value}`]: !!placement.value,
      },
      aside: {
        'p-layout-resizable--events-none': dragging.value,
        'p-layout-resizable__aside--collapsed': collapsed.value,
        [`p-layout-resizable__aside-${placement.value}`]: !!placement.value,
      },
      handle: {
        'p-layout-resizable__handle--resizable': resizable,
        'p-layout-resizable__handle--collapsed': collapsed.value,
        'p-layout-resizable__handle--e-resizable': resizable && placement.value === 'left',
        'p-layout-resizable__handle--w-resizable': resizable && placement.value === 'right',
        'p-layout-resizable__handle--s-resizable': resizable && placement.value === 'top',
        'p-layout-resizable__handle--n-resizable': resizable && placement.value === 'bottom',
        [`p-layout-resizable__handle--${placement.value}`]: !!placement.value,
      },
      main: {
        'p-layout-resizable--events-none': dragging.value,
        [`p-layout-resizable__main--${placement.value}`]: !!placement.value,
      },
    }
  })

  const getAsideSize = (cursorPosition: number = 0): number | undefined => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    // We can't use the useElementRect composition here because it doesn't update the rect see https://github.com/PrefectHQ/vue-compositions/issues/250
    const containerRect = container.value.getBoundingClientRect()

    const collapsePoint = props.collapsePoint ?? 0
    let passedCollapsePoint = false

    let size = 0
    switch (placement.value) {
      case 'left':
        size = cursorPosition - containerRect.x
        passedCollapsePoint = cursorPosition - containerRect.x < collapsePoint
        break
      case 'right':
        size = containerRect.x + containerRect.width - cursorPosition
        passedCollapsePoint = cursorPosition > containerRect.x + containerRect.width - collapsePoint
        break
      case 'top':
        size = cursorPosition - containerRect.y
        passedCollapsePoint = cursorPosition < containerRect.y + collapsePoint
        break
      case 'bottom':
        size = containerRect.y + containerRect.height - cursorPosition
        passedCollapsePoint = cursorPosition > containerRect.y + containerRect.height - collapsePoint
        break
      default:
        break
    }

    collapsed.value = !!props.collapsePoint && passedCollapsePoint

    size = Math.max(size, 0)
    size = Math.min(size, horizontal.value ? containerRect.width : containerRect.height)

    return size
  }


  const drag = (event: MouseEvent): void => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    const cursorPosition = horizontal.value ? event.clientX : event.clientY

    asideSize.value = getAsideSize(cursorPosition)

    if (horizontal.value) {
      aside.value.style.width = `${asideSize.value}px`
    } else {
      aside.value.style.height = `${asideSize.value}px`
    }
  }

  watch(placement, (newVal, oldVal) => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    // TODO: Use the ratio of the previous aside/container size to calculate the new size
    // and whether it should be collapsed or not
    const horizontalNewVal = isHorizontalPlacement(newVal)
    const horizontalOldVal = isHorizontalPlacement(oldVal)

    if (horizontalNewVal && !horizontalOldVal) {
      aside.value.style.height = '100%'
      aside.value.style.width = 'auto'
    }

    if (!horizontalNewVal && horizontalOldVal) {
      aside.value.style.height = 'auto'
      aside.value.style.width = '100%'
    }
  })

  const start = (): void => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    dragging.value = true
    document.body.classList.add(`p-layout-resizable--resizing-${placement.value}`)
    window.addEventListener('mouseup', stop)
    window.addEventListener('mousemove', drag)
  }

  const stop = (): void => {
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('mouseup', stop)
    dragging.value = false
    document.body.classList.remove(`p-layout-resizable--resizing-${placement.value}`)
  }

  const handleAsideClick = (): void => {
    if (!props.disabled && collapsed.value) {
      expand()
    }
  }

  const expand = (): void => {
    collapsed.value = false
  }

  const collapse = (): void => {
    collapsed.value = true
  }

  const toggle = (): void => {
    collapsed.value = !collapsed.value
  }
</script>

<style>
.p-layout-resizable {
  --handle-size: var(--p-layout-resizable-handle-size, 4px);
  --collapsed-size: var(--p-layout-resizable-aside-collapsed-size, 0);
}

.p-layout-resizable--right,
.p-layout-resizable--left {
  --aside-size: var(--p-layout-resizable-aside-size, min-content);
  --aside-max-size: var(--p-layout-resizable-aside-max-size, theme(width.80));
  --aside-min-size: var(--p-layout-resizable-aside-min-size, theme(width.20));
}

.p-layout-resizable--top,
.p-layout-resizable--bottom {
  --aside-size: var(--p-layout-resizable-aside-size, min-content);
  --aside-max-size: var(--p-layout-resizable-aside-max-size, theme(height.32));
  --aside-min-size: var(--p-layout-resizable-aside-min-size, theme(width.16));
}

.p-layout-resizable--resizing-right,
.p-layout-resizable--resizing-left,
.p-layout-resizable--resizing-top,
.p-layout-resizable--resizing-bottom { @apply
  select-none
}

.p-layout-resizable--resizing-right,
.p-layout-resizable--resizing-left { @apply
  cursor-col-resize
}

.p-layout-resizable--resizing-top,
.p-layout-resizable--resizing-bottom { @apply
  cursor-row-resize
}

.p-layout-resizable { @apply
  flex
  overflow-hidden
  max-w-full
  min-w-0
  h-full
  w-full
}

.p-layout-resizable--left { @apply
  flex-row
}

.p-layout-resizable--right { @apply
  flex-row-reverse
}

.p-layout-resizable--top { @apply
  flex-col
}

.p-layout-resizable--bottom { @apply
  flex-col-reverse
}

.p-layout-resizable__handle {
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.p-layout-resizable__handle--e-resizable,
.p-layout-resizable__handle--w-resizable { @apply
  cursor-ew-resize
}

.p-layout-resizable__handle--n-resizable,
.p-layout-resizable__handle--s-resizable { @apply
  cursor-ns-resize
}

.p-layout-resizable__handle--e-resizable.p-layout-resizable__handle--collapsed { @apply
  cursor-e-resize
}

.p-layout-resizable__handle--w-resizable.p-layout-resizable__handle--collapsed { @apply
  cursor-w-resize
}

.p-layout-resizable__handle--n-resizable.p-layout-resizable__handle--collapsed { @apply
  cursor-n-resize
}

.p-layout-resizable__handle--s-resizable.p-layout-resizable__handle--collapsed { @apply
  cursor-s-resize
}

.p-layout-resizable--events-none { @apply
  pointer-events-none
  select-none
}

.p-layout-resizable__aside { @apply
  relative
  overflow-auto
}

.p-layout-resizable__aside-left,
.p-layout-resizable__aside-right { @apply
  h-full
  min-w-[var(--aside-min-size)]
  w-[var(--aside-size)]
  max-w-[var(--aside-max-size)]
}

.p-layout-resizable__aside-top,
.p-layout-resizable__aside-bottom { @apply
  w-full
  min-h-[var(--aside-min-size)]
  h-[var(--aside-size)]
  max-h-[var(--aside-max-size)]
}

/* TODO: We can bounce this animation a little to make it feel less harsh */
.p-layout-resizable__aside-left.p-layout-resizable__aside--collapsed,
.p-layout-resizable__aside-right.p-layout-resizable__aside--collapsed { @apply
  min-w-[var(--collapsed-size)]
  max-w-[var(--collapsed-size)]
}

.p-layout-resizable__aside-top.p-layout-resizable__aside--collapsed,
.p-layout-resizable__aside-bottom.p-layout-resizable__aside--collapsed { @apply
  max-h-[var(--collapsed-size)]
  min-h-[var(--collapsed-size)]
}

.p-layout-resizable__handle { @apply
  border-none
  justify-center
  flex
  relative
  z-[1]
}

.p-layout-resizable__handle--left,
.p-layout-resizable__handle--right { @apply
  h-full
  w-1
}

.p-layout-resizable__handle--top,
.p-layout-resizable__handle--bottom { @apply
  h-1
  w-full
}

.p-layout-resizable__main { @apply
  relative
  overflow-auto
  self-stretch
  justify-self-stretch
  h-full
  w-full
  min-h-0
  min-w-0
  z-0
}

.p-layout-resizable__main {
  flex: 1 1 0%;
}
</style>