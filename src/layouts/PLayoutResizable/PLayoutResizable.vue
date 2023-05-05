<template>
  <section ref="container" class="p-layout-resizable" :class="classes.root">
    <aside v-if="slots.aside" ref="aside" class="p-layout-resizable__aside" :class="classes.aside">
      <slot name="aside" v-bind="{ collapsed, expand, collapse, toggle }" />
    </aside>

    <div
      v-if="slots.default && slots.aside"
      class="p-layout-resizable__divider"
      :class="classes.divider"
      @mousedown="start"
      @mouseup="handleAsideClick"
    />

    <main v-if="slots.default" class="p-layout-resizable__main" :class="classes.main">
      <slot v-bind="{ collapsed, expand, collapse, toggle }" />
    </main>
  </section>
</template>

<script lang="ts" setup>
  import { useElementRect } from '@prefecthq/vue-compositions'
  import { computed, ref, useSlots, watch } from 'vue'

  export type PLayoutResizablePlacement = 'left' | 'right' | 'top' | 'bottom'

  const props = defineProps<{
    collapsePoint?: number,
    disabled?: boolean,
    placement?: PLayoutResizablePlacement,
  }>()


  const slots = useSlots()

  const container = ref<HTMLDivElement>()
  const aside = ref<HTMLDivElement>()

  const containerRect = useElementRect(container)
  const asideRect = useElementRect(aside)

  const dragging = ref(false)
  const collapsed = ref(false)

  const placement = computed(() => props.placement ?? 'left')

  const classes = computed(() => {
    const resizable = !props.disabled && !collapsed.value

    return {
      root: {
        [`p-layout-resizable--${placement.value}`]: !!placement.value,
      },
      aside: {
        'p-layout-resizable--events-none': dragging.value,
        'p-layout-resizable__aside--collapsed': collapsed.value,
        [`p-layout-resizable__aside-${placement.value}`]: !!placement.value,
      },
      divider: {
        'p-layout-resizable__divider--resizable': resizable,
        'p-layout-resizable__divider--collapsed': collapsed.value,
        'p-layout-resizable__divider--e-resizable': resizable && placement.value === 'left',
        'p-layout-resizable__divider--w-resizable': resizable && placement.value === 'right',
        'p-layout-resizable__divider--s-resizable': resizable && placement.value === 'top',
        'p-layout-resizable__divider--n-resizable': resizable && placement.value === 'bottom',
        [`p-layout-resizable__divider--${placement.value}`]: !!placement.value,
      },
      main: {
        'p-layout-resizable--events-none': dragging.value,
        [`p-layout-resizable__main--${placement.value}`]: !!placement.value,
      },
    }
  })

  const drag = (event: MouseEvent): void => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    const isHorizontal = placement.value === 'left' || placement.value === 'right'
    const cursorPosition = isHorizontal ? event.clientX : event.clientY

    let size = 0
    const collapsedValue = false
    const collapsePoint = props.collapsePoint ?? 0
    switch (placement.value) {
      case 'left':
        size = cursorPosition - asideRect.x.value
        // collapsedValue = cursorPosition < collapsePoint
        break
      case 'right':
        size = asideRect.x.value + asideRect.width.value - cursorPosition
        // collapsedValue = cursorPosition > containerRect.width.value - collapsePoint
        break
      case 'top':
        size = cursorPosition - asideRect.y.value
        // collapsedValue = cursorPosition < collapsePoint
        break
      case 'bottom':
        size = asideRect.y.value + asideRect.height.value - cursorPosition
        // collapsedValue = cursorPosition > containerRect.height.value - collapsePoint
        break
      default:
        break
    }

    if (isHorizontal) {
      // reset height to auto
      aside.value.style.width = `${size}px`
    } else {
      aside.value.style.height = `${size}px`
    }

    if (props.collapsePoint) {
      collapsed.value = collapsedValue
    }
  }

  watch(placement, (newVal, oldVal) => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    const horizontalNewVal = newVal === 'left' || newVal === 'right'
    const horizontalOldVal = oldVal === 'left' || oldVal === 'right'

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

.p-layout-resizable__divider {
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.p-layout-resizable__divider--e-resizable,
.p-layout-resizable__divider--w-resizable { @apply
  cursor-ew-resize
}

.p-layout-resizable__divider--n-resizable,
.p-layout-resizable__divider--s-resizable { @apply
  cursor-ns-resize
}

.p-layout-resizable__divider--e-resizable.p-layout-resizable__divider--collapsed { @apply
  cursor-e-resize
}

.p-layout-resizable__divider--w-resizable.p-layout-resizable__divider--collapsed { @apply
  cursor-w-resize
}

.p-layout-resizable__divider--n-resizable.p-layout-resizable__divider--collapsed { @apply
  cursor-n-resize
}

.p-layout-resizable__divider--s-resizable.p-layout-resizable__divider--collapsed { @apply
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

.p-layout-resizable__aside--collapsed { @apply
  min-w-min
  max-w-min
}

.p-layout-resizable__divider { @apply
  border-none
  justify-center
  flex
  relative
  z-[1]
}

.p-layout-resizable__divider--left,
.p-layout-resizable__divider--right { @apply
  h-full
  w-1
}

.p-layout-resizable__divider--top,
.p-layout-resizable__divider--bottom { @apply
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
  min-w-0
  z-0
}

.p-layout-resizable__main {
  flex: 1 1 0%;
}

.p-layout-resizable__main--left { @apply
  -ml-1
}

.p-layout-resizable__main--right { @apply
  -mr-1
}

.p-layout-resizable__main--top { @apply
  -mt-1
}

.p-layout-resizable__main--bottom { @apply
  -mb-1
}
</style>