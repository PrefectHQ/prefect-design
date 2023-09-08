<template>
  <PPopOver ref="popover" class="p-tooltip" v-bind="{ placement, to }">
    <template #target>
      <span :id="id" class="p-tooltip__target" role="tooltip" @pointerenter="open" @focusin="open">
        <slot />
      </span>
    </template>
    <slot name="tooltip">
      <div class="p-tooltip__tooltip" :area-describedby="id">
        <div class="p-tooltip__content">
          <slot name="content">
            <p>{{ text }}</p>
          </slot>
        </div>
      </div>
    </slot>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted, ref } from 'vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { PositionMethod } from '@/types/position'
  import { isNotNullish, isHtmlElement, randomId } from '@/utilities'
  import { top, bottom, left, right } from '@/utilities/position'

  const props = defineProps<{
    text?: string,
    placement?: PositionMethod | PositionMethod[],
    to?: string | Element,
    disabled?: boolean,
  }>()

  const popover = ref<InstanceType<typeof PPopOver> | null>(null)
  const placement = computed(() => props.placement ?? [top, right, bottom, left])
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
  const id = randomId()

  onUnmounted(() => {
    document.removeEventListener('pointerover', onCloseEvent)
  })

  function open(): void {
    if (props.disabled) {
      return
    }

    timeout.value = setTimeout(() => popover.value?.open(), 500)

    document.addEventListener('pointerover', onCloseEvent)
    document.addEventListener('focusin', onCloseEvent)
    document.addEventListener('keydown', onKeyDown)
  }

  function close(): void {
    popover.value?.close()
    document.removeEventListener('pointerover', onCloseEvent)
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('focusin', onCloseEvent)
  }

  function onCloseEvent(event: PointerEvent | FocusEvent): void {
    if (!isHtmlElement(event.target)) {
      return
    }

    const { target, content } = popover.value ?? {}

    if (isNotNullish(target) && target.contains(event.target)) {
      return
    }

    if (isNotNullish(content) && content.contains(event.target)) {
      return
    }

    if (timeout.value) {
      clearTimeout(timeout.value)
    }

    close()
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      close()
    }
  }
</script>

<style>
.p-tooltip { @apply
  inline-flex
}

.p-tooltip__tooltip { @apply
  p-1
  max-w-xs
}

.p-tooltip__content { @apply
  bg-floating
  px-2
  py-1
  rounded-default
  shadow
  dark:shadow-md
  max-w-xs
}
</style>