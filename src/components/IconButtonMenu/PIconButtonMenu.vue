<template>
  <PPopOver
    ref="popOver"
    class="p-icon-button-menu"
    :class="classes"
    :style="styles"
    :placement="[bottomRight, topRight, bottomLeft, topLeft]"
    auto-close
  >
    <template #target="{ toggle }">
      <p-button ref="button" :icon="icon" v-bind="attrs" @click="toggle" />
    </template>
    <div class="p-icon-button-menu__content" @keydown.esc="esc" @click="close">
      <POverflowMenu>
        <slot v-bind="{ close }" />
      </POverflowMenu>
    </div>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import POverflowMenu from '@/components/OverflowMenu/POverflowMenu.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { Icon } from '@/types/icon'
  import { topRight, bottomRight, bottomLeft, topLeft } from '@/utilities/position'

  defineOptions({
    inheritAttrs: false,
  })

  withDefaults(defineProps<{
    icon?: Icon,
  }>(), {
    icon: 'EllipsisVerticalIcon',
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
