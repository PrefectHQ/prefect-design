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
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  const props = defineProps<{
    open: boolean,
    modal?: boolean,
    autoClose?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:open', value: boolean): void,
  }>()

  const dialog = ref<HTMLDialogElement>()

  function show(): void {
    if (!dialog.value) {
      return
    }

    if (props.modal) {
      dialog.value.showModal()
      return
    }

    dialog.value.show()
  }

  function close(): void {
    if (!dialog.value) {
      return
    }

    dialog.value.close()
  }

  function syncOpenValue(): void {
    if (!dialog.value) {
      return
    }

    emit('update:open', dialog.value.open)
  }

  function onClick(event: MouseEvent): void {
    if (!props.autoClose) {
      return
    }

    if (event.target === dialog.value) {
      close()
    }
  }

  watch(() => props.open, open => {
    if (open) {
      show()
      return
    }

    close()
  })

  onMounted(() => {
    dialog.value?.addEventListener('close', syncOpenValue)
  })

  onUnmounted(() => {
    dialog.value?.removeEventListener('close', syncOpenValue)
  })
</script>
