<template>
  <div ref="container" class="resizable-section">
    <div ref="content" class="resizable-section__content" @mouseup="stop">
      <slot />
    </div>

    <div class="resizable-section__aside">
      <div class="resizable-section__handle" @mousedown="start" @mouseup="stop">
        <ResizeIcon />
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
  import { toPixels } from '@/utilities'
  import { onMounted, ref } from 'vue'
  import ResizeIcon from './ResizeIcon.svg'

  const container = ref<HTMLDivElement>()
  const content = ref<HTMLDivElement>()
  const dragging = ref(false)
  const contentWidth = ref(0)
  const maxWidth = ref(0)
  const minWidth = 200
  const handleWidth = 24
  const handleWidthPx = `${handleWidth}px`

  const start = (): void => {
    dragging.value = true
    window.addEventListener('mouseup',  stop)
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

    contentWidth.value =  Math.min(Math.max(positionX, minWidth), offsetWidth - handleWidth)
    content.value!.style.width = toPixels(contentWidth.value)
  }

  onMounted(() => {
    maxWidth.value = container.value!.offsetWidth
    contentWidth.value = content.value!.offsetWidth
  })
</script>

<style>
.resizable-section { @apply
  w-full
  flex
  relative
  border
  overflow-hidden
}

.resizable-section__content { @apply
  max-w-full
  min-w-[200px]
  w-full
  p-4
  overflow-auto
  overscroll-contain;
}

.resizable-section__aside { @apply
  bg-slate-800/25
  grow;
}

.resizable-section__handle { @apply
  bg-slate-800/25
  w-[v-bind(handleWidthPx)]
  h-full
  flex
  justify-center
  items-center
  cursor-ew-resize;
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.resizable-section__resize-icon { @apply
  w-full
  rotate-90
  text-slate-900
}

.resizable-section__px { @apply
  bg-opacity-70
  bg-slate-900
  text-slate-100
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
