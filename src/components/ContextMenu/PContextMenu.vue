<template>
  <PPopOver
    ref="popOver"
    class="p-context-menu"
    :placement="internalPlacement"
    :group="group"
    :auto-close="!disableAutoClose"
  >
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible }" />
    </template>
    <template #default="{ close }">
      <slot name="context-menu" v-bind="{ close }">
        <POverflowMenu class="p-context-menu__content" @click.stop="closeOnMenuClick">
          <slot v-bind="{ close }" />
        </POverflowMenu>
      </slot>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { useMousePosition, useKeyDown } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { PositionMethod, keys } from '@/types'
  import { bottomLeft, bottomRight, topLeft, topRight } from '@/utilities/position'
  import { positionAroundPoint } from '@/utilities/positionRelative'

  const props = withDefaults(defineProps<{
    placement?: PositionMethod | PositionMethod[],
    disableAutoClose?: boolean,
    disableCloseOnEscape?: boolean,
    disableCloseOnMenuClick?: boolean,
    positionAtClick?: boolean,
    group?: string,
  }>(), {
    placement: undefined,
    group: undefined,
  })

  const popOver = ref<typeof PPopOver>()

  const { positionAtLastClick } = useMousePosition()

  const internalPlacement = computed(() => {
    if (props.placement) {
      return props.placement
    }

    if (props.positionAtClick) {
      return [
        positionAroundPoint(positionAtLastClick, bottomLeft),
        positionAroundPoint(positionAtLastClick, topLeft),
        positionAroundPoint(positionAtLastClick, topRight),
        positionAroundPoint(positionAtLastClick, bottomRight),
      ]
    }

    return [topRight, bottomRight, bottomLeft, topLeft]
  })

  function internalClose(): void {
    popOver.value?.close()
  }

  function closeOnMenuClick(): void {
    if (props.disableCloseOnMenuClick) {
      return
    }

    internalClose()
  }

  function closeOnEscape(): void {
    if (props.disableCloseOnEscape) {
      return
    }

    internalClose()
  }

  useKeyDown(keys.escape, closeOnEscape)
</script>

<style>
.p-context-menu { @apply
  inline-block
}
</style>