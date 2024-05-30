<template>
  <TooltipProvider v-bind="delegatedProviderProps">
    <TooltipRoot v-bind="delegatedRootProps">
      <TooltipTrigger as-child>
        <slot />

        <TooltipContent
          v-bind="delegatedContentProps"
          :as-child="Boolean($slots.tooltip)"
        >
          <slot name="tooltip">
            <slot name="content">
              {{ text }}
            </slot>
          </slot>
        </TooltipContent>
      </TooltipTrigger>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
  import { type TooltipRootProps, type TooltipProviderProps, type TooltipContentProps } from 'radix-vue'
  import { computed } from 'vue'
  import TooltipContent from '@/components/Tooltip/PTooltipContent.vue'
  import TooltipProvider from '@/components/Tooltip/PTooltipProvider.vue'
  import TooltipRoot from '@/components/Tooltip/PTooltipRoot.vue'
  import TooltipTrigger from '@/components/Tooltip/PTooltipTrigger.vue'

  const props = withDefaults(
    defineProps<TooltipRootProps & TooltipProviderProps & Omit<TooltipContentProps, 'asChild' | 'as'> & { text?: string }>(),
    {
      text: undefined,
      // Mimicking radix-vue's TooltipRoot props. These need to be undefined rather than Vue's default behavior of
      // coercing boolean props to false so that the default values are respected when forwarded.
      defaultOpen: false,
      open: undefined,
      delayDuration: undefined,
      disableHoverableContent: undefined,
      disableClosingTrigger: undefined,
      disabled: undefined,
      ignoreNonKeyboardFocus: undefined,
    })


  const delegatedRootProps = computed<TooltipRootProps>(() => {
    const { defaultOpen, open, delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus } = props
    return { defaultOpen, open, delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus }
  })

  const delegatedProviderProps = computed<TooltipProviderProps>(() => {
    const { delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus, skipDelayDuration } = props
    return { delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus, skipDelayDuration }
  })

  const delegatedContentProps = computed<TooltipContentProps>(() => {
    const { side, sideOffset, align, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, ariaLabel, alignOffset } = props
    return { side, sideOffset, align, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, ariaLabel, alignOffset }
  })
</script>
