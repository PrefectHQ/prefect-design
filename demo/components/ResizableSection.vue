<template>
  <div ref="container" class="resizable-section">
    <p-frame v-if="show" :style="styles.iframe" :class="classes.iframe" :body-class="classes.content">
      <div class="resizable-section__content">
        <slot />
      </div>
    </p-frame>

    <div class="resizable-section__aside">
      <div class="resizable-section__handle" @mousedown="start" @mouseup="stop">
        <component :is="ResizeIcon" />
      </div>

      <transition name="fade">
        <div v-if="dragging" class="resizable-section__px">
          {{ contentWidth }}px
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useColorTheme } from '@/compositions'
  import { toPixels } from '@/utilities'
  import { computed, ref, nextTick } from 'vue'
  import ResizeIcon from '@/demo/components/ResizeIcon.svg'

  const container = ref<HTMLDivElement>()
  const dragging = ref(false)
  const contentWidth = ref<number>()
  const minWidth = 200
  const handleWidth = 24
  const handleWidthPx = `${handleWidth}px`

  const { value: colorTheme } = useColorTheme()
  const show = ref(true)

  const classes = computed(() => ({
    content: {
      'dark': colorTheme.value === 'dark',
      'light': colorTheme.value === 'light',
    },
    iframe: {
      'pointer-events-none': dragging.value,
    },
  }))

  const styles = computed(() => ({
    iframe: {
      'width': contentWidth.value ? toPixels(contentWidth.value) : '100%',
    },
  }))

  const start = (): void => {
    dragging.value = true
    window.addEventListener('mouseup', stop)
    window.addEventListener('mousemove', drag)
  }

  const stop = (): void => {
    dragging.value = false
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('mouseup', stop)
  }

  const drag = (event: MouseEvent): void => {
    const { offsetLeft, offsetWidth } = container.value!
    const positionX = event.clientX - offsetLeft

    contentWidth.value = Math.min(Math.max(positionX, minWidth), offsetWidth - handleWidth)
  }

  // This code block allows the component to take advantage of HMR
  if (import.meta.hot) {
    const { hot } = import.meta

    hot.on('vite:afterUpdate', async () => {
      show.value = false
      await nextTick()
      show.value = true
    })
  }
</script>

<style>
.resizable-section { @apply
  w-full
  flex
  relative
  border
  border-divider
  overflow-hidden
  bg-transparent
  rounded-default
}

.resizable-section__content { @apply
  relative
  order-first
  max-w-full
  min-w-[200px]
  p-4
}

.resizable-section__aside { @apply
  grow
}

.resizable-section__handle { @apply
  bg-floating
  shadow-md
  w-[v-bind(handleWidthPx)]
  h-full
  flex
  justify-center
  items-center
  cursor-ew-resize
}

.resizable-section__px { @apply
  select-none
  rounded-default
  px-2
  py-0.5
  absolute
  bottom-1
  left-1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
