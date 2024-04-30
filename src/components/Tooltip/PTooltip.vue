<template>
  <TooltipProvider :v-bind="delegatedProviderProps">
    <TooltipBase :v-bind="delegatedRootProps">
      <TooltipTrigger as-child>
        <slot />
        <TooltipContent :v-bind="delegatedContentProps">
          <p>Add to library</p>
        </TooltipContent>
      </TooltipTrigger>
    </TooltipBase>
  </TooltipProvider>
</template>

<script setup lang="ts">
  import { type TooltipRootProps, type TooltipProviderProps, type TooltipContentProps } from 'radix-vue'
  import { defineProps, computed } from 'vue'
  import TooltipBase from '@/components/Tooltip/PTooltipBase.vue'
  import TooltipContent from '@/components/Tooltip/PTooltipContent.vue'
  import TooltipProvider from '@/components/Tooltip/PTooltipProvider.vue'
  import TooltipTrigger from '@/components/Tooltip/PTooltipTrigger.vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<TooltipRootProps & TooltipProviderProps & TooltipContentProps & { text?: string }>()


  const delegatedRootProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { defaultOpen, open, delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus } = props
    return { defaultOpen, open, delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus }
  })

  const delegatedProviderProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus } = props
    return { delayDuration, disableHoverableContent, disableClosingTrigger, disabled, ignoreNonKeyboardFocus }
  })

  const delegatedContentProps = computed(() => {
    // eslint-disable-next-line id-length, no-unused-vars
    const { sideOffset, align, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached } = props
    return { sideOffset, align, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached }
  })
</script>
