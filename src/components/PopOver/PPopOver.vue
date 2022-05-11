<template>
  <div ref="target" class="p-pop-over" v-bind="attrs">
    <slot name="target" v-bind="{ open, close, toggle }" />
  </div>
  <teleport v-if="visible" :to="to">
    <div ref="content" :style="styles">
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, withDefaults, ref, watch, computed, useAttrs } from 'vue'

  export default defineComponent({
    name: 'BaseInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { useMostVisiblePositionStyles } from '@/compositions/position'
  import { PositionMethod } from '@/types/position'
  import { left, right, bottom, top } from '@/utilities/position'

  const props = withDefaults(defineProps<{
    placement: PositionMethod | PositionMethod[],
    to?: string,
  }>(), {
    placement: () => [left, right, bottom, top],
    to: 'body',
  })

  const emit = defineEmits<{
    (event: 'open', value: boolean): void,
  }>()

  const attrs = useAttrs()

  const visible = ref(false)
  const container = ref(document.querySelector(props.to) ?? undefined)
  const placements = computed(() => Array.isArray(props.placement) ? props.placement : [props.placement])
  const { target, content, styles } = useMostVisiblePositionStyles(placements, { container })

  function open(): void {
    visible.value = true
  }

  function close(): void {
    visible.value = false
  }

  function toggle(): void {
    visible.value = !visible.value
  }

  watch(visible, value => emit('open', value))
</script>