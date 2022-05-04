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

        <span class="p-modal__browser-center-trick" aria-hidden="true">&#8203;</span>

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
            <div class="p-modal__body">
              <slot name="icon" class="p-modal__icon" />

              <div class="p-modal__text-container">
                <slot name="title" class="p-modal__title" />
                <slot name="content" />
              </div>
            </div>

            <div class="p-modal__footer">
              <slot name="actions" />

              <button
                type="button"
                class="p-modal__close-btn"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
  import { TransitionChild, TransitionRoot } from '@headlessui/vue'

  defineProps<{
    showModal: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'close'): void,
  }>()

  const closeModal = (): void => {
    emit('close')
  }
</script>

<style>
.p-modal {
  @apply
   fixed
   z-10
   inset-0
   overflow-y-auto
}

.p-modal__container {
  @apply
   flex
   items-end
   justify-center
   min-h-screen
   pt-4
   px-4
   pb-20
   text-center
   sm:block
   sm:p-0
}

.p-modal__background {
  @apply
   fixed
   inset-0
   bg-gray-500
   bg-opacity-75
   transition-opacity
}

.p-modal__browser-center-trick {
  @apply
   hidden
   sm:inline-block
   sm:align-middle
   sm:h-screen
}

.p-modal__card {
  @apply
   relative
   inline-block
   align-bottom
   bg-white
   rounded-lg
   text-left
   overflow-hidden
   shadow-xl
   transform
   transition-all
   sm:my-8
   sm:align-middle
   sm:max-w-lg
   sm:w-full
}

.p-modal__body {
  @apply
  flex
  flex-col
  gap-3
  bg-white
  p-4
  pt-5
  sm:p-6
  sm:pb-4
  sm:gap-4
  sm:flex-row
  sm:items-start
}

.p-modal__icon {
  @apply
   flex-shrink-0
   flex
   items-center
   justify-center
}

.p-modal__text-container {
  @apply
  flex
  flex-col
  gap-2
   text-center
   sm:text-left
}

.p-modal__title {
  @apply
   text-lg
   leading-6
   font-medium
   text-gray-900
}

.p-modal__footer {
  @apply
  flex
  flex-col
  gap-3
   bg-gray-50
   px-4
   py-3
   sm:px-6
   sm:flex
   sm:justify-end
   sm:flex-row
}

.p-modal__close-btn {
  @apply
  w-full
  inline-flex
  justify-center
  rounded-md
  border
  border-gray-300
  shadow-sm
  px-4
  py-2
  bg-white
  text-base
  font-medium
  text-gray-700
  hover:bg-gray-50
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-indigo-500
  sm:w-auto
  sm:text-sm
  sm:order-first
  sm:py-3
}
</style>