<template>
  <PPopOver
    ref="popOver"
    class="p-context-menu"
    :placement="placement"
    :group="group"
    :auto-close="autoClose"
  >
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible }">
        <PButton @click="toggle">
          Button
        </PButton>
      </slot>
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
  import { useGlobalEventListener } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { PositionMethod, keys } from '@/types'
  import { isKeyEvent } from '@/utilities'
  import { bottomLeft, bottomRight, topLeft, topRight } from '@/utilities/position'

  const props = withDefaults(defineProps<{
    placement?: PositionMethod | PositionMethod[],
    autoClose?: boolean,
    disableCloseOnEscape?: boolean,
    disableCloseOnMenuClick?: boolean,
    group?: string,
  }>(), {
    placement: () => [topRight, bottomLeft, bottomRight, topLeft],
    group: undefined,
  })

  const popOver = ref<typeof PPopOver>()

  function internalClose(): void {
    popOver.value?.close()
  }

  function closeOnMenuClick(): void {
    if (props.disableCloseOnMenuClick) {
      return
    }

    internalClose()
  }

  function closeOnEscape(event: KeyboardEvent): void {
    if (props.disableCloseOnEscape) {
      return
    }

    if (isKeyEvent(keys.escape, event)) {
      internalClose()
    }
  }

  useGlobalEventListener('keyup', closeOnEscape)
</script>

<style>
.p-context-menu { @apply
  inline-block
}
</style>