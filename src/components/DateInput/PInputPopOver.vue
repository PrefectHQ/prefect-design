<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside]"
    class="p-input-pop-over"
    auto-close
    @keydown="onKeydown"
  >
    <template #target="scope">
      <slot name="input" v-bind="scope" />
    </template>

    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { useKeyDown } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { keys } from '@/types/keyEvent'
  import { media } from '@/utilities/media'
  import { bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside } from '@/utilities/position'

  const props = defineProps<{
    disabled?: boolean,
  }>()

  const popOver = ref<typeof PPopOver>()
  const isOpen = computed(() => popOver.value?.visible ?? false)

  function openPicker(): void {
    if (!isOpen.value && !props.disabled) {
      popOver.value!.open()
    }
  }

  function closePicker(): void {
    if (isOpen.value) {
      popOver.value!.close()
    }
  }

  useKeyDown('Escape', onEscape)

  function onEscape(event: KeyboardEvent): void {
    if (media.hover && isOpen.value) {
      closePicker()
      event.preventDefault()
    }
  }

  function onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case keys.escape:
      case keys.tab:
        closePicker()
        break
      case keys.space:
        if (!isOpen.value) {
          openPicker()
        }
        event.preventDefault()
        break
      default:
        break
    }
  }
</script>