<template>
  <p-pop-over
    ref="popOver"
    class="p-icon-button-menu"
    :class="classes"
    :style="styles"
    :placement="[bottomRight, topRight, bottomLeft, topLeft]"
    auto-close
  >
    <template #target="{ toggle }">
      <p-button ref="button" :icon="icon" v-bind="attrs" inset @click="toggle" />
    </template>
    <div class="p-icon-button-menu__content" @keydown.esc="esc" @click="close">
      <p-overflow-menu>
        <slot v-bind="{ close }" />
      </p-overflow-menu>
    </div>
  </p-pop-over>
</template>

<script lang="ts">
  export default {
    name: 'PIconButtonMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { ref, withDefaults } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { Icon } from '@/types/icon'
  import { topRight, bottomRight, bottomLeft, topLeft } from '@/utilities/position'

  withDefaults(defineProps<{
    icon?: Icon,
  }>(), {
    icon: 'DotsVerticalIcon',
  })

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()
  const button = ref<typeof PButton>()

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    if (popOver.value) {
      popOver.value.close()
    }

    if (button.value) {
      button.value.el.focus()
    }
  }
</script>

<style>
.p-icon-button-menu { @apply
  inline-block
}

.p-icon-button-menu__content { @apply
  py-1
}
</style>