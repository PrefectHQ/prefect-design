<template>
  <dialog ref="dialog" class="p-dialog" @click="onClick">
    <div class="p-dialog__content">
      <template v-if="open">
        <slot v-bind="{ close }" />
      </template>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
  import { useGlobalEventListener } from '@prefecthq/vue-compositions'
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import { isHtmlElement } from '@/utilities/html'

  const props = defineProps<{
    open: boolean,
    modal?: boolean,
    autoClose?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:open', value: boolean): void,
    (event: 'close' | 'open'): void,
  }>()

  const dialog = ref<HTMLDialogElement>()

  function show(): void {
    if (!dialog.value) {
      return
    }

    emit('open')

    if (props.modal) {
      dialog.value.showModal()
      return
    }

    dialog.value.show()
    setTimeout(() => addOnClickListener())
  }

  function close(): void {
    if (!dialog.value) {
      return
    }

    emit('close')
    dialog.value.close()
    removeOnClickListener()
  }

  function syncOpenValue(): void {
    if (!dialog.value) {
      return
    }

    emit('update:open', dialog.value.open)
  }

  function onClick(event: MouseEvent): void {
    if (!props.open || !props.autoClose || !dialog.value || !isHtmlElement(event.target)) {
      return
    }

    const shouldCloseModal = props.modal && event.target === dialog.value
    const shouldCloseDialog = !props.modal && !dialog.value.contains(event.target)

    if (shouldCloseModal || shouldCloseDialog) {
      close()
    }
  }

  const { add: addOnClickListener, remove: removeOnClickListener } = useGlobalEventListener('click', onClick)

  watch(() => props.open, open => {
    if (open) {
      show()
      return
    }

    close()
  }, { immediate: true })


  onMounted(() => {
    dialog.value?.addEventListener('close', syncOpenValue)
  })

  onUnmounted(() => {
    dialog.value?.removeEventListener('close', syncOpenValue)
  })
</script>
