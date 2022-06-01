<template>
  <TransitionRoot as="div" :show="showModal">
    <div class="p-modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="p-modal__container">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="p-modal__background" aria-hidden="true" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="p-modal__card">
            <div class="p-modal__header" :class="classes">
              <div class="p-modal__tile-icon-group">
                <slot name="icon" :close="closeModal">
                  <template v-if="icon">
                    <p-icon :icon="icon" class="p-modal__icon" />
                  </template>
                </slot>
                <slot name="title" :close="closeModal">
                  <span class="p-modal__title">{{ title }}</span>
                </slot>
              </div>
              <p-button class="p-modal__x-button" size="lg" icon="XIcon" flat @click="closeModal" />
            </div>

            <div class="p-modal__body">
              <slot :close="closeModal" />
            </div>

            <div class="p-modal__footer">
              <slot name="actions" :close="closeModal" />
              <slot name="cancel" :close="closeModal">
                <p-button inset class="p-modal__close-button" @click="closeModal">
                  Cancel
                </p-button>
              </slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
  import { TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { computed, useSlots, watchEffect } from 'vue'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    showModal: boolean,
    title?: string,
    icon?: Icon,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emits('update:showModal', value)
    },
  })

  const slots = useSlots()

  const classes = computed(() => ({
    'p-modal__header--no-title': props.title === undefined && slots.title === undefined,
  }))

  function closeModal(): void {
    internalValue.value = false
  }

  watchEffect(() => {
    document.body.classList.toggle('p-modal__stop-bg-scroll', props.showModal)
  })
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
  bg-gray-500
  bg-opacity-75
  transition-opacity
}

.p-modal__card { @apply
  relative
  inline-block
  bg-white
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
  text-gray-900
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
}

.p-modal__close-button { @apply
  sm:order-first
}

.p-modal__x-button { @apply
  text-gray-400
  !p-1
}

.p-modal__stop-bg-scroll { @apply
  overflow-hidden
}
</style>