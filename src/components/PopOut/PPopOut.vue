<template>
  <div :ref="refs.trigger" class="p-pop-out">
    <slot name="trigger" v-bind="{ open, close, toggle }" />
  </div>
  <teleport v-if="visible" :to="to">
    <div :ref="refs.content" class="p-pop-out__content">
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { withDefaults, reactive, ref, watch } from 'vue'
  import { PositionMethod } from '../../types/position'
  import { left, right, bottom, top } from '../../utilities/placement'

  const props = withDefaults(defineProps<{
    placement: PositionMethod | PositionMethod[],
    to: string,
  }>(), {
    placement: () => [left, right, bottom, top],
    to: 'body',
  })

  const emit = defineEmits<{
    (event: 'open', value: boolean): void,
  }>()

  const visible = ref(false)

  const refs = reactive({
    trigger: ref(),
    content: ref(),
  })

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

<style></style>