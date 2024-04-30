<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="p-tooltip"
      :class="props.class"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>

<script setup lang="ts">
  import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'radix-vue'
  import { type HTMLAttributes, computed } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })


  // eslint-disable-next-line vue/require-default-prop
  const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
    sideOffset: 4,
  })

  const emits = defineEmits<TooltipContentEmits>()

  const delegatedProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
  })

  const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<style>
.p-tooltip{@apply
  z-50
  overflow-hidden
  rounded-md
  border
  bg-popover
  px-3
  py-1.5
  text-sm
  text-popover-foreground
  shadow-md
  animate-in
  fade-in-0
  zoom-in-95
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=closed]:zoom-out-95
  data-[side=bottom]:slide-in-from-top-2
  data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2
}
</style>