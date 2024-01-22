<template>
  <teleport :to="modalTeleportTarget">
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
      >
        <div class="p-modal__container">
          <div class="p-modal__background" aria-hidden="true" @click="handleMaskClick" />
          <div class="p-modal__card">
            <div class="p-modal__header" :class="classes.header">
              <div class="p-modal__tile-icon-group">
                <slot name="icon" v-bind="modalScope">
                  <template v-if="icon">
                    <PIcon :icon="icon" class="p-modal__icon" />
                  </template>
                </slot>
                <slot name="title" v-bind="modalScope">
                  <span class="p-modal__title">{{ title }}</span>
                </slot>
              </div>
              <p-button class="p-modal__x-button" icon="XMarkIcon" small flat @click="modalScope.close" />
            </div>

            <div ref="modalBody" class="p-modal__body">
              <slot v-bind="modalScope" />
            </div>

            <div class="p-modal__footer">
              <slot name="actions" v-bind="modalScope" />
              <slot name="cancel" v-bind="modalScope">
                <p-button class="p-modal__close-button" @click="modalScope.close">
                  Cancel
                </p-button>
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
  import { useGlobalEventListener, useModal } from '@/compositions'
  import { useFocusableElements } from '@/compositions/useFocusableElements'
  import { modalTeleportTarget } from '@/plugins/Modal'
  import { keys } from '@/types'
  import { Icon } from '@/types/icon'
  import { isKeyEvent } from '@/utilities'

  const props = defineProps<{
    showModal?: boolean,
    title?: string,
    icon?: Icon,
    autoClose?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalOpen = ref<boolean>(false)
  const open = computed<boolean>({
    get() {
      return props.showModal || internalOpen.value
    },
    set(value) {
      internalOpen.value = value
      emit('update:showModal', value)
    },
  })
  const modalScope = useModal(open)

  const modalRoot = ref<HTMLDivElement>()
  const modalBody = ref<HTMLDivElement>()
  const slots = useSlots()

  const classes = computed(() => ({
    header: {
      'p-modal__header--no-title': props.title === undefined && slots.title === undefined,
    },
  }))

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
      close()
    }
  }

  function closeOnEscape(event: KeyboardEvent): void {
    if (open.value && props.autoClose && isKeyEvent(keys.escape, event)) {
      close()
    }
  }
  useGlobalEventListener('keyup', closeOnEscape)


  function enableBackgroundScroll(): void {
    document.body.classList.remove('p-modal__stop-bg-scroll')
  }

  onBeforeUnmount(enableBackgroundScroll)

  watch(() => props.showModal, value => {
    if (value) {
      nextTick(focusOnFirstFocusable)
    }

    document.body.classList.toggle('p-modal__stop-bg-scroll', value)
  }, { immediate: true })
</script>

<style>
.p-modal { @apply
  hidden
  fixed
  z-10
  inset-0
}

.p-modal:last-child { @apply
  block
}

.p-modal__container { @apply
  flex
  justify-center
  items-center
  min-h-screen
  p-4
}

.p-modal__background { @apply
  fixed
  inset-0
  bg-overlay
}

.p-modal__card { @apply
  relative
  flex
  flex-col
  rounded-default
  shadow-xl
  transition-all
  sm:max-w-lg
  sm:w-full;
  background-color: var(--p-color-bg-0);
  max-height: calc(100vh - theme('spacing.8'));
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
  border-divider
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
  flex-shrink
  overflow-auto
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
  border-divider
}

.p-modal__close-button { @apply
  sm:order-first
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