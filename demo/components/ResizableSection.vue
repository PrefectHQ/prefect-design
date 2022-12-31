<template>
  <div ref="container" class="resizable-section">
    <p-frame :style="styles.iframe" :class="classes.iframe">
      <div class="resizable-section__content" :class="classes.content">
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
  import { computed, ref } from 'vue'
  import ResizeIcon from '@/demo/components/ResizeIcon.svg'

  const container = ref<HTMLDivElement>()
  const dragging = ref(false)
  const contentWidth = ref<number>()
  const minWidth = 200
  const handleWidth = 24
  const handleWidthPx = `${handleWidth}px`

  const { value: colorTheme } = useColorTheme()

  const classes = computed(() => ({
    content: {
      'dark': colorTheme.value === 'dark',
      'light': colorTheme.value === 'light',
      'bg-background-900': colorTheme.value === 'light',
      'bg-background-400': colorTheme.value === 'dark',
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
</script>

<style>
.resizable-section { @apply
  w-full
  flex
  relative
  border
  overflow-hidden
  bg-transparent
  rounded
  dark:border-background-600
}

.resizable-section__content { @apply
  relative
  order-first
  max-w-full
  min-w-[200px]
  p-4
}

.resizable-section__aside { @apply
  bg-background-500
  grow
}

.resizable-section__handle { @apply
  bg-background-600
  text-foreground-300
  w-[v-bind(handleWidthPx)]
  h-full
  flex
  justify-center
  items-center
  cursor-ew-resize;
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.resizable-section__px { @apply
  select-none
  bg-opacity-70
  bg-background
  text-foreground
  rounded
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
