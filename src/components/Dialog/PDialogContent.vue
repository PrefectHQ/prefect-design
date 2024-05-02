<template>
  <DialogPortal>
    <DialogOverlay
      class="p-dialog-overlay"
    />
    <DialogContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="p-dialog-content"
    >
      <slot />

      <DialogClose
        class="p-dialog-close"
      >
        <p-icon icon="Close" class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
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
.p-dialog-overlay{
  @apply
  fixed
  inset-0
  z-50
  bg-black/80
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
}

.p-dialog-content{
  @apply
  rounded-md
  fixed
  left-1/2
  top-1/2
  z-50
  grid
  w-full
  max-w-lg
  -translate-x-1/2
  -translate-y-1/2
  gap-4
  border
  bg-background
  p-6
  shadow-lg
  duration-200
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
  data-[state=closed]:zoom-out-95
  data-[state=open]:zoom-in-95
  data-[state=closed]:slide-out-to-left-1/2
  data-[state-closed]:slide-out-to-top-[48%]
}

.p-dialog-close{
  @apply
  absolute
  right-4
  top-4
  rounded-sm
  opacity-70
  ring-offset-background
  transition-opacity
  hover:opacity-100
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  disabled:pointer-events-none
  data-[state=open]:bg-accent
  data-[state=open]:text-muted-foreground
}
</style>