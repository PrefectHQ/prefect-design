<template>
  <PPopOver
    ref="popOver"
    class="p-context-menu"
    :class="classes"
    :style="styles"
    :placement="placement"
    auto-close
  >
    <template #target="{ toggle }">
      <slot v-bind="{ toggle }">
        <PButton v-bind="attrs" @click="toggle">
          Button
        </PButton>
      </slot>
    </template>
    <slot name="context-menu" v-bind="{ close }">
      <POverflowMenu class="p-context-menu__content" @click.stop="closeOnClick">
        <slot name="context-menu-items" v-bind="{ close }" />
      </POverflowMenu>
    </slot>
  </PPopOver>
</template>

<script lang="ts">
  export default {
    name: 'PIconButtonMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useGlobalEventListener } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { PositionMethod, keys } from '@/types'
  import { isKeyEvent } from '@/utilities'
  import { topRight, bottomRight, bottomLeft, topLeft } from '@/utilities/position'

  const props = withDefaults(defineProps<{
    placement?: PositionMethod | PositionMethod[],
    preventCloseOnClick?: boolean,
  }>(), {
    placement: () => [bottomRight, topRight, bottomLeft, topLeft],
  })

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()

  function closeOnClick(): void {
    if (!props.preventCloseOnClick) {
      close()
    }
  }

  function close(): void {
    popOver.value?.close()
  }

  useGlobalEventListener('click', close)
  useGlobalEventListener('keyup', closeOnEscape)

  function closeOnEscape(event: KeyboardEvent): void {
    if (isKeyEvent(keys.escape, event)) {
      close()
    }
  }
</script>
