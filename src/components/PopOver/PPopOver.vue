<template>
  <div ref="target" class="p-pop-over" v-bind="attrs">
    <slot name="target" v-bind="{ open, close, toggle }" />
  </div>
  <teleport v-if="visible" :to="to">
    <div ref="content" :style="styles">
      <slot v-bind="{ close }" />
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, withDefaults, ref, watch, computed, useAttrs, onMounted, onUnmounted } from 'vue'

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
    autoClose?: boolean,
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

  onMounted(() => {
    if (props.autoClose) {
      document.addEventListener('click', eventHandler)
      document.addEventListener('focusin', eventHandler)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('click', eventHandler)
    document.removeEventListener('focusin', eventHandler)
  })

  function eventHandler(event: MouseEvent | FocusEvent): void {
    console.log(event)
    if (target.value?.contains(event.target as Node) || content.value?.contains(event.target as Node)) {
      return
    }

    close()
  }

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