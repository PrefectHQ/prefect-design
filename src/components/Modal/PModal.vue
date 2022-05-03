<template>
  <teleport v-if="showModal" :to="to">
    <div class="p-modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="p-modal__container">
        <!-- BACKGROUND -->
        <transition name="background">
          <div class="p-modal__background" aria-hidden="true" />
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. – Tailwind -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


        <!-- SLOTS -->
        <transition name="card">
          <div class="p-modal__card">
            <div class="p-modal__body">
              <div class="p-modal__icon">
                <slot name="icon" />
              </div>

              <div class="p-modal__textbox">
                <div class="p-modal__title">
                  <slot name="title" />
                </div>
                <slot name="content" />
              </div>
            </div>


            <div class="p-modal__footer">
              <slot name="action-btn" />
              <button
                type="button"
                class="p-modal__close-btn"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue'

  withDefaults(defineProps<{
    to?: string,
    showModal: boolean,
  }>(), {
    to: 'body',
  })

  const emit = defineEmits<{
    (event: 'close'): void,
  }>()

  const closeModal = (): void => {
    emit('close')
  }
</script>

<style scoped>
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
  bg-white
  px-4
  pt-5
  pb-4
  sm:p-6
  sm:pb-4
  sm:flex
  sm:items-start
}

.p-modal__icon {
  @apply
   mx-auto
   flex-shrink-0
   flex
   items-center
   justify-center
   h-12
   w-12
   sm:mx-0
   sm:h-10
   sm:w-10
}

.p-modal__textbox {
  @apply
   mt-3
   text-center
   sm:mt-0
   sm:ml-4
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
   bg-gray-50
   px-4
   py-3
   sm:px-6
   sm:flex
   sm:flex-row-reverse
}

.p-modal__close-btn {
  @apply
  mt-3
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
  sm:mt-0
  sm:ml-3
  sm:w-auto
  sm:text-sm
}

/* Background Transition */
.background-enter-active {
  @apply
  ease-out
  duration-1000
}
.background-enter-from {
  @apply
  opacity-0
}
.background-enter-to {
  @apply
  opacity-100
}
.background-leave-active {
  @apply
  ease-in
  duration-1000
}
.background-leave-from {
  @apply
  opacity-100
}
.background-leave-to {
  @apply
  opacity-0
}

/* Modal Card Transition */
.card-enter-active {
  @apply
  ease-out
  duration-300
}
.card-enter-from {
  @apply
  opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95
}
.card-enter-to {
  @apply
  opacity-100 translate-y-0 sm:scale-100
}
.card-leave-active {
  @apply
  ease-in duration-200
}
.card-leave-from {
  @apply
  opacity-100 translate-y-0 sm:scale-100
}
.card-leave-to {
  @apply
  opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95
}
</style>