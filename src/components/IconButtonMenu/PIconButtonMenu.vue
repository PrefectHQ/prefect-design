<template>
  <p-pop-over class="p-icon-button-menu" :class="classes" :style="styles" :placement="[bottomRight, topRight]" auto-close>
    <template #target="{ toggle }">
      <p-button :icon="icon" v-bind="attrs" inset @click="toggle" />
    </template>
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </p-pop-over>
</template>

<script lang="ts">
  import { defineComponent, withDefaults } from 'vue'

  export default defineComponent({
    name: 'PIconButtonMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { Icon } from '@/types/icon'
  import { topRight, bottomRight } from '@/utilities/position'

  withDefaults(defineProps<{
    icon?: Icon,
  }>(), {
    icon: 'DotsVerticalIcon',
  })

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
</script>

<style>
.p-icon-button-menu { @apply
  inline-block
}
</style>