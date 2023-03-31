<template>
  <PPopOver ref="popover" class="p-tooltip" v-bind="{ placement, to }">
    <template #target>
      <span class="p-tooltip__target" @pointerenter="open">
        <slot />
      </span>
    </template>
    <slot name="tooltip">
      <div class="p-tooltip__tooltip">
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
  import { isDefined, isHtmlElement } from '@/utilities'
  import { top, bottom, left, right } from '@/utilities/position'

  const props = defineProps<{
    text?: string,
    placement?: PositionMethod | PositionMethod[],
    to?: string | Element,
  }>()

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  const popover = ref<InstanceType<typeof PPopOver>>()
  const placement = computed(() => props.placement ?? [top, right, bottom, left])

  function open(): void {
    popover.value?.open()
    document.addEventListener('pointerover', onPointerOver)
  }

  function close(): void {
    popover.value?.close()
    document.removeEventListener('pointerover', onPointerOver)
  }

  onUnmounted(() => {
    document.removeEventListener('pointerover', onPointerOver)
  })

  function onPointerOver(event: PointerEvent): void {
    if (!isHtmlElement(event.target)) {
      return
    }

    const { target, content } = popover.value ?? {}

    if (isDefined(target) && target.contains(event.target)) {
      return
    }

    if (isDefined(content) && content.contains(event.target)) {
      return
    }

    close()
  }
</script>

<style>
.p-tooltip { @apply
  inline-flex
}

.p-tooltip__tooltip { @apply
  p-2
}

.p-tooltip__content { @apply
  bg-slate-800
  px-2
  py-1
  text-sm
  rounded-sm
  border-[1px]
  border-slate-600
}
</style>