<template>
  <div
    class="p-card"
    :class="normalizeClass([attrClasses, card({ variant })])"
    :style="attrStyles"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'
  import { normalizeClass } from 'vue'
  import { useAttrsStylesAndClasses } from '@/compositions'

  defineOptions({
    inheritAttrs: false,
  })

  const { classes: attrClasses, styles: attrStyles, attrs } = useAttrsStylesAndClasses()

  const card = cva(
    'p-card p-background', {
      variants: {
        variant: {
          ghost: 'p-card-ghost',
        },
      },
      defaultVariants: {
        variant: null,
      },
    },
  )

  export type CardProps = VariantProps<typeof card>

  defineProps<{
    variant?: CardProps['variant'],
  }>()
</script>


<style>
.p-card {
  @apply
    rounded-lg
    border
    text-card-foreground
    shadow-sm;
}

.p-card-ghost {
  @apply
    bg-transparent
    border-transparent
    shadow-none;
}
</style>