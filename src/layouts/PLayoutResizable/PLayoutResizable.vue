<template>
  <section ref="container" class="p-layout-resizable">
    <aside v-if="slots.aside" ref="aside" class="p-layout-resizable__aside" :class="classes.aside">
      <slot name="aside" :collapsed="collapsed" />
    </aside>

    <div
      v-if="slots.default && slots.aside"
      class="p-layout-resizable__divider"
      :class="classes.divider"
      @mousedown="start"
      @mouseup="handleAsideClick"
    />

    <main v-if="slots.default" class="p-layout-resizable__main" :class="classes.main">
      <slot />
    </main>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, useSlots } from 'vue'

  const props = defineProps<{
    collapsePoint?: number,
    disabled?: boolean,
  }>()

  const slots = useSlots()

  const container = ref<HTMLDivElement>()
  const aside = ref<HTMLDivElement>()

  const dragging = ref(false)
  const collapsed = ref(false)

  const classes = computed(() => ({
    aside: {
      'p-layout-resizable--events-none': dragging.value,
      'p-layout-resizable__aside--collapsed': collapsed.value,
    },
    divider: {
      'p-layout-resizable__divider--resizable': !props.disabled && !dragging.value,
      'p-layout-resizable__divider--collapsed': collapsed.value,
    },
    main: {
      'p-layout-resizable--events-none': dragging.value,
    },
  }))

  let asideLeft = 0
  const drag = (event: MouseEvent): void => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    if (props.collapsePoint) {
      collapsed.value = event.clientX - asideLeft < props.collapsePoint
    }

    aside.value.style.width = `${event.clientX - asideLeft}px`
  }

  const start = (): void => {
    if (props.disabled || !container.value || !aside.value) {
      return
    }

    const asideBounds = aside.value.getBoundingClientRect()
    asideLeft = asideBounds.left
    document.body.style.cursor = 'col-resize'
    dragging.value = true
    document.body.style.userSelect = 'none'
    window.addEventListener('mouseup', stop)
    window.addEventListener('mousemove', drag)
  }

  const stop = (): void => {
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('mouseup', stop)
    document.body.style.userSelect = 'auto'
    dragging.value = false
    document.body.style.removeProperty('cursor')
  }

  const handleAsideClick = (): void => {
    if (!props.disabled && collapsed.value) {
      collapsed.value = false
    }
  }
</script>

<style>
.p-layout-resizable {
  --aside-width: var(--p-layout-resizable-aside-width, min-content);
  --aside-max-width: var(--p-layout-resizable-aside-max-width, theme(width.80));
  --aside-min-width: var(--p-layout-resizable-aside-min-width, theme(width.20));
}

.p-layout-resizable { @apply
  flex
  overflow-hidden
  max-w-full
  min-w-0
  h-full
  w-full
}

.p-layout-resizable__divider {
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.p-layout-resizable__divider--resizable { @apply
  cursor-ew-resize
}

.p-layout-resizable__divider--resizable.p-layout-resizable__divider--collapsed { @apply
  cursor-e-resize
}

.p-layout-resizable--events-none { @apply
  pointer-events-none
  select-none
}

.p-layout-resizable__aside { @apply
  relative
  h-full
  overflow-auto
  min-w-[var(--aside-min-width)]
  w-[var(--aside-width)]
  max-w-[var(--aside-max-width)]
}

.p-layout-resizable__aside--collapsed { @apply
  min-w-min
  max-w-min
}

.p-layout-resizable__divider { @apply
  h-full
  border-none
  justify-center
  flex
  relative
  w-1
  z-[1]
}

.p-layout-resizable__main { @apply
  relative
  overflow-auto
  -ml-1
  h-full
  w-full
  z-0
}

.p-layout-resizable__main {
  flex: 1 1 0%;
}
</style>