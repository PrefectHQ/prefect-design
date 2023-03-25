<template>
  <teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal"
        ref="modalRoot"
        class="p-modal"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        v-bind="$attrs"
        @keydown="handleKeydown"
      >
        <div class="p-modal__container">
          <div class="p-modal__background" aria-hidden="true" @click="handleMaskClick" />
          <div class="p-modal__card">
            <div class="p-modal__header" :class="classes.header">
              <div class="p-modal__tile-icon-group">
                <slot name="icon" :close="closeModal">
                  <template v-if="icon">
                    <PIcon :icon="icon" class="p-modal__icon" />
                  </template>
                </slot>
                <slot name="title" :close="closeModal">
                  <span class="p-modal__title">{{ title }}</span>
                </slot>
              </div>
              <PButton class="p-modal__x-button" size="lg" icon="XIcon" flat @click="closeModal" />
            </div>

            <div ref="modalBody" class="p-modal__body">
              <slot :close="closeModal" />
            </div>

            <div class="p-modal__footer">
              <slot name="actions" :close="closeModal" />
              <slot name="cancel" :close="closeModal">
                <PButton inset class="p-modal__close-button" @click="closeModal">
                  Cancel
                </PButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script lang="ts">
  export default {
    name: 'PModal',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script setup lang="ts">
  import { nextTick, computed, ref, useSlots, watch, onBeforeUnmount } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { useFocusableElements } from '@/compositions/useFocusableElements'
  import { keys } from '@/types'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    showModal: boolean,
    title?: string,
    icon?: Icon,
    autoClose?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value) {
      emits('update:showModal', value)
    },
  })

  const modalRoot = ref<HTMLDivElement>()
  const modalBody = ref<HTMLDivElement>()
  const slots = useSlots()

  const classes = computed(() => ({
    header: {
      'p-modal__header--no-title': props.title === undefined && slots.title === undefined,
    },
  }))

  function closeModal(): void {
    internalValue.value = false
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === keys.escape) {
      closeModal()
    }
  }

  function findFirstFocusable(): HTMLElement | undefined {
    const focusable = useFocusableElements(modalBody)

    return focusable.value.length ? focusable.value[0] : modalRoot.value
  }

  function focusOnFirstFocusable(): void {
    const firstFocusable = findFirstFocusable()

    firstFocusable?.focus()
  }

  function handleMaskClick(): void {
    if (props.autoClose) {
      closeModal()
    }
  }

  function disableBackgroundScroll(): void {
    document.body.classList.add('p-modal__stop-bg-scroll')
  }

  function enableBackgroundScroll(): void {
    document.body.classList.remove('p-modal__stop-bg-scroll')
  }

  onBeforeUnmount(enableBackgroundScroll)

  watch(() => props.showModal, value => {
    if (value) {
      nextTick(focusOnFirstFocusable)
    }

    if (value) {
      disableBackgroundScroll()
    } else {
      enableBackgroundScroll()
    }
  }, { immediate: true })
</script>

<style>
.p-modal { @apply
  fixed
  z-10
  inset-0
  overflow-y-auto
}

.p-modal__container { @apply
  flex
  justify-center
  items-center
  min-h-screen
  pt-4
  px-4
  pb-20
}

.p-modal__background { @apply
  fixed
  inset-0
  bg-background-600
  bg-opacity-75
  transition-opacity
}

.p-modal__card { @apply
  relative
  inline-block
  bg-background-500
  rounded-lg
  shadow-xl
  transition-all
  sm:max-w-lg
  sm:w-full
}

.p-modal__header { @apply
  flex
  justify-between
  items-center
  px-5
  py-3
  border-b
  text-lg
  leading-6
  font-medium
  text-foreground-900
  border-background-400
  dark:border-background-600
}

.p-modal__header--no-title { @apply
  border-none
}

.p-modal__tile-icon-group { @apply
  flex
  items-center
  gap-2
}

.p-modal__body { @apply
  flex
  flex-col
  gap-3
  p-5
  sm:py-6
  sm:gap-4
}

.p-modal__footer { @apply
  flex
  flex-col
  gap-3
  px-5
  py-3
  border-t
  sm:justify-end
  sm:flex-row
  border-background-400
  dark:border-background-600
}

.p-modal__close-button { @apply
  sm:order-first
}

.p-modal__x-button { @apply
  text-foreground-400
  !p-1
}

.p-modal__stop-bg-scroll { @apply
  overflow-hidden
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}

.modal-enter-active .p-modal__card,
.modal-leave-active .p-modal__card {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to { @apply
  opacity-0
}

.modal-enter-from .p-modal__card,
.modal-leave-to .p-modal__card { @apply
  opacity-0
  translate-y-4
  sm:translate-y-0
  sm:scale-95
}
</style>