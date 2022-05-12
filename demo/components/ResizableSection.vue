<template>
  <div ref="container" class="resizable-section">
    <div ref="content" class="resizable-section__content">
      <slot />
    </div>

    <div class="resizable-section__aside">
      <div ref="handle" class="resizable-section__handle" @mousedown="start">
        <p-icon icon="MenuAlt4Icon" class="resizable-section__resize-icon" />
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
  import { onMounted, ref } from 'vue'
  import { toPixels } from '@/utilities'

  const container = ref()
  const content = ref()
  const handle = ref()
  const dragging = ref(false)
  const contentWidth = ref(0)
  const maxWidth = ref(0)
  const minWidth = 200
  const handleWidth = 16

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
    const _c = container.value
    const positionX = event.clientX - _c.offsetLeft
    contentWidth.value =  Math.min(Math.max(positionX, minWidth), _c.offsetWidth - handleWidth)

    content.value.style.width = toPixels(contentWidth.value)
  }

  onMounted(() => {
    maxWidth.value = container.value.offsetWidth
    contentWidth.value = content.value.offsetWidth
  })
</script>

<style>
.resizable-section { @apply
  min-h-[200px] w-full flex relative rounded-lg overflow-hidden ring-1 ring-gray-900 ring-opacity-5;
}

.resizable-section__content { @apply
  max-w-full min-w-[200px] w-full overflow-auto;
}


.resizable-section__aside { @apply
  bg-slate-500 grow;
}

.resizable-section__handle { @apply
  bg-slate-200 w-[16px] h-full flex cursor-ew-resize;
  filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.2));
}

.resizable-section__resize-icon { @apply
  w-full rotate-90 text-slate-900
}

.resizable-section__px { @apply
  bg-opacity-70 bg-slate-900 text-slate-100 rounded px-2 py-0.5 absolute bottom-1 left-1;
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
