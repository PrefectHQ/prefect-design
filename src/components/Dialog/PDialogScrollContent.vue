<template>
  <DialogPortal>
    <DialogOverlay
      class="p-dialog-overlay--scroll-content"
    >
      <DialogContent
        class="p-dialog-content--scroll-content"
        v-bind="{ ...forwarded, ...$attrs }"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary"
        >
          <p-icon icon="Close" class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<script setup lang="ts">
  import {
    DialogClose,
    DialogContent,
    type DialogContentEmits,
    type DialogContentProps,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits
  } from 'radix-vue'

  defineOptions({
    inheritAttrs: false,
  })

  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DialogContentProps>()
  const emits = defineEmits<DialogContentEmits>()


  const forwarded = useForwardPropsEmits(props, emits)
</script>

<style>
.p-dialog-overlay--scroll-content {
  @apply
  fixed
  inset-0
  grid
  place-items-center
  overflow-y-auto
  bg-black/80
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
}

.p-dialog-content--scroll-content {
  @apply
  relative
  z-50
  grid
  rounded-md
  w-full
  max-w-lg
  my-8
  gap-4
  border
  border-border
  bg-background
  p-6
  shadow-lg
  duration-200
  sm:rounded-lg
  md:w-full;
}
</style>
